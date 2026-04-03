import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.post("/api/initiate-payment", async (req, res) => {
    const { ticketType, name, email, phone, hospital } = req.body;

    // PROACTIVE SECURITY: The Vault
    const priceList: Record<string, number> = {
      "Option_A": 200,
      "Option_B": 100
    };

    const amountToCharge = priceList[ticketType];

    if (!amountToCharge) {
      return res.status(400).json({ error: "Nice try! Invalid ticket type." });
    }

    const tx_ref = `LIHOW-${Date.now()}`;

    try {
      const response = await fetch("https://api.flutterwave.com/v3/payments", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          tx_ref: tx_ref,
          amount: amountToCharge,
          currency: "NGN",
          redirect_url: `${req.protocol}://${req.get('host')}/thank-you`,
          customer: {
            email: email,
            phonenumber: phone,
            name: name
          },
          meta: {
            hospital: hospital,
            ticket_tier: ticketType
          },
          customizations: {
            title: "LIHOW 2026",
            description: "Lagos Island House Officers' Week"
          }
        })
      });

      const fwData = await response.json();

      if (fwData.status === "success") {
        return res.status(200).json({ checkout_url: fwData.data.link });
      } else {
        console.error("Flutterwave Error:", fwData);
        return res.status(500).json({ error: "Payment gateway error. Please try again." });
      }

    } catch (error) {
      console.error("Server Error:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  });

  app.post("/api/webhook", async (req, res) => {
    // 2. Security Check
    const secretHash = process.env.FLW_WEBHOOK_HASH;
    const signature = req.headers['verif-hash'];

    if (!signature || signature !== secretHash) {
      return res.status(401).end(); 
    }

    const payload = req.body;

    // 3. Process successful charges
    if (payload.event === 'charge.completed' && payload.data.status === 'successful') {
      const transactionId = payload.data.id;

      try {
        // BULLETPROOF FIX: Ask Flutterwave for the COMPLETE transaction details
        const fwResponse = await fetch(`https://api.flutterwave.com/v3/transactions/${transactionId}/verify`, {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
            "Content-Type": "application/json"
          }
        });

        const fwData = await fwResponse.json();

        if (fwData.status === "success") {
          const verifiedData = fwData.data;

          // Now we safely extract the data because the Verify API guarantees the 'meta' object is there
          const sheetData = {
            name: verifiedData.customer.name || "",
            email: verifiedData.customer.email || "",
            phone: verifiedData.customer.phone_number || "",
            hospital: verifiedData.meta?.hospital || "Missing",
            ticketType: verifiedData.meta?.ticket_tier || "Missing",
            amount: verifiedData.amount,
            txRef: verifiedData.tx_ref
          };

          // 4. Send the clean data to your Google Apps Script URL
          if (process.env.GOOGLE_SCRIPT_URL) {
            await fetch(process.env.GOOGLE_SCRIPT_URL, {
              method: 'POST',
              body: JSON.stringify(sheetData)
            });
          } else {
            console.warn("GOOGLE_SCRIPT_URL not set, skipping sheet update");
          }
        }
      } catch (error) {
        console.error("Webhook Verification Failed:", error);
      }
    }

    // 5. Always return 200 OK to Flutterwave so they stop pinging
    return res.status(200).end();
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
