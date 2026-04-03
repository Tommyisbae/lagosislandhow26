export default async function handler(req, res) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 2. Extract data from the frontend
  const { ticketType, name, email, phone, hospital } = req.body;

  // 3. PROACTIVE SECURITY: The Vault
  const priceList = {
    "Option_A": 50000,
    "Option_B": 25000
  };

  const amountToCharge = priceList[ticketType];

  if (!amountToCharge) {
    return res.status(400).json({ error: "Nice try! Invalid ticket type." });
  }

  // 4. Generate a unique transaction reference
  const tx_ref = `LIHOW-${Date.now()}`;

  // 5. Call Flutterwave's Server to generate the locked link
  try {
    // Determine the base URL for the redirect
    // Vercel automatically provides the host in the headers
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const redirectUrl = `${protocol}://${host}/thank-you`;

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
        redirect_url: redirectUrl,
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

    // 6. Send the secure link back to the frontend
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
}
