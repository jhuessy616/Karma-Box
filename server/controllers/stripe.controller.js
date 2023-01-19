require("dotenv").config();
const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const validateSession = require("../middleware/validate-session");

router.get("/config", validateSession, (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

router.post("/create-payment-intent", validateSession, async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "USD",
      amount: 100,
      //setup_future_usage: 'off-session',
      automatic_payment_methods: { enabled: true },
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
      paymentIntent: paymentIntent,
    });
  } catch (error) {
    return res.status(400).send({
      error: {
        messgae: error.message,
      },
    });
  }
});

module.exports = router;
