export default async function handler(req, res) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') return res.status(405).end();

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
        await fetch(process.env.GOOGLE_SCRIPT_URL, {
          method: 'POST',
          body: JSON.stringify(sheetData)
        });
      }
    } catch (error) {
      console.error("Webhook Verification Failed:", error);
    }
  }

  // 5. Always return 200 OK to Flutterwave so they stop pinging
  return res.status(200).end();
}
