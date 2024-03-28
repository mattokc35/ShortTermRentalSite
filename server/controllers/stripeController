const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
//uuid unique transaction ID generator
const { v4: uuidv4 } = require("uuid");

function generateUniqueTransactionId() {
  // Generate a random UUID (Universally Unique Identifier) version 4
  return uuidv4();
}

const createVerificationSession = async (userId) => {
  try {
    // Create the verification session
    const verificationSession =
      await stripe.identity.verificationSessions.create({
        type: "document",
        metadata: {
          user_id: userId,
        },
      });

    // Return the client secret
    return verificationSession.client_secret;
  } catch (error) {
    console.error("Error creating verification session:", error.message);
    throw new Error("Internal Server Error");
  }
};

const handleWebhookEvent = async (rawBody, signature) => {
  try {
    let event;

    // Verify the webhook signature
    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Error verifying webhook signature:", err.message);
      throw new Error(`Webhook Error: ${err.message}`);
    }

    // Handle the event based on its type
    switch (event.type) {
      case "checkout.session.completed":
        const paymentIntent = event.data.object;
        console.log(
          `PaymentIntent for ${paymentIntent.amount} was successful!`
        );
        // Add your logic for processing successful payment here
        break;
      case "payment_method.attached":
        const paymentMethod = event.data.object;
        // Add your logic for handling attached payment methods here
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
  } catch (error) {
    console.error("Error handling webhook event:", error.message);
    throw new Error("Internal Server Error");
  }
};

const createCheckoutSession = async (productName, priceAmount) => {
  const transactionId = generateUniqueTransactionId();
  try {
    // Create a new product dynamically
    const product = await stripe.products.create({
      name: productName,
      type: "service",
    });

    // Generate a new price for the created product
    const price = await stripe.prices.create({
      unit_amount: parseInt(priceAmount),
      currency: "usd",
      product: product.id,
    });

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: price.id, quantity: 1 }],
      mode: "payment",
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
      client_reference_id: transactionId, // Attach your unique transaction ID as a reference
    });

    return session.id;
  } catch (error) {
    console.error("Error creating checkout session:", error.message);
    throw new Error("Internal Server Error");
  }
};

module.exports = {
  createVerificationSession,
  handleWebhookEvent,
  createCheckoutSession,
};
