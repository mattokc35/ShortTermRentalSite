const express = require("express");
const router = express.Router();
const stripeController = require("../controllers/stripeController");

// POST route for creating a verification session
router.post("/create-verification-session", async (req, res) => {
  const { userId } = req.body;
  try {
    const clientSecret = await stripeController.createVerificationSession(
      userId
    );
    res.status(200).json({ clientSecret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST route for handling webhook events
router.post("/webhook", async (req, res) => {
  const { rawBody, headers } = req;
  const signature = headers["stripe-signature"];
  try {
    await stripeController.handleWebhookEvent(rawBody, signature);
    res.status(200).json({ received: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST route for creating a checkout session
router.post("/create-checkout-session", async (req, res) => {
  const { productName, priceAmount } = req.body;
  try {
    const sessionId = await stripeController.createCheckoutSession(
      productName,
      priceAmount
    );
    res.status(200).json({ sessionId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
