require("dotenv").config();
const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const jwt = require("jsonwebtoken");
const validateSession = require("../middleware/validate-session");
const User = require('../models/user.model')

router.get("/config", validateSession, (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

router.post('/create-setup-intent', validateSession, async(req, res) => {
  try {
    
    const user = req.user._id
    const customer = await stripe.customers.create({
      description: 'test customer',
      metadata: {'user': `${user}`},
      // payment_method: '',
    })
   
    console.log(customer.id)
    const setupIntent = await stripe.setupIntents.create({
      customer: customer.id,
      payment_method_types: ['card'],
      metadata: {'user': `${user}`},
    })
    const filter = { _id: user };
    const update = {customerId: customer.id, setupId: setupIntent.id}
    const returnOptions = { new: true };
    const updatedUser = await User.findOneAndUpdate(filter, update, returnOptions);
    
    const token = jwt.sign(
      { id: updatedUser._id, isAdmin: updatedUser.isAdmin, isCharity:updatedUser.isCharity, customerId: updatedUser.customerId, setupId: updatedUser.setupId, paymentMethodId: updatedUser.paymentMethodId },
      process.env.JWT,
      {
        expiresIn: 600000 * 60 * 24,
      }
    );
    res.send({
      token: token,
      setupIntent: setupIntent,
      customer: setupIntent.customer,
      clientSecret: setupIntent.client_secret
    })
  } catch (error) {
    return res.status(400).send({
      error: {
        message: error.message
      }
    })
  }
})


router.post("/create-payment-intent", validateSession, async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      paymentMethod: req.user.paymentMethodId,
      customer: req.user.customerId,
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

router.get('/customers/:id', validateSession, async(req, res) => {
  try {
    const customerId = req.user.customerId
    const customer = await stripe.customers.retrieve(
      customerId
    )
    res.send({
       customer: customer
    })
  } catch (error) {
    res.status(400).send({
      error: {
        message: error.message
      }
    })
  }
})

router.get('/customers/:customer/payment_methods', validateSession, async(req, res) => {
  try {
    const customerId = req.user.customerId
    const paymentMethod = await stripe.customers.retrievePaymentMethod(
      customerId,
      paymentMethod
    )
    res.send({
      paymentMethod: paymentMethod
    })
  } catch (error) {
    res.status(400).send({
      error: {
        message: error.message
      }
    })
  }
})

router.post('/payment_methods/:id/attach', validateSession, async(req, res) => {
  try {
    const customerId = req.user.customerId
    console.log(typeof customerId)
    const paymentMethod = await stripe.paymentMethods.attach(
      
    )
    res.send({
      paymentMethod: paymentMethod
    })
  } catch (error) {
    res.status(400).send({
      error: {
        message: error.message
      }
    })
  }
})

router.get('/setup_intents/:id', validateSession, async(req, res) => {
  const user = req.user._id
  const setupId = req.user.setupId
  console.log(setupId)
  const setupIntent = await stripe.setupIntents.retrieve(
    setupId
  )
  const filter = {_id: user};
  const update = {paymentMethodId: setupIntent.payment_method}
  const returnOptions = { new: true };
  const updatedUser = await User.findOneAndUpdate(filter, update, returnOptions);

  const token = jwt.sign(
    { id: updatedUser._id, isAdmin: updatedUser.isAdmin, isCharity:updatedUser.isCharity, customerId: updatedUser.customerId, setupId: updatedUser.setupId, paymentMethodId: updatedUser.paymentMethodId },
    process.env.JWT,
    {
      expiresIn: 600000 * 60 * 24,
    }
  );
  res.send({
    token: token,
    setupIntent: setupIntent,
    paymentMethodId: setupIntent.paymentMethodId
  })
})

router.get('/customers/:customer/payment_methods/:payment_method', validateSession, async(req, res) => {
  const customerId = req.user.customerId
  const paymentMethodId = req.user.paymentMethodId
  const paymentMethod = await stripe.customers.retrievePaymentMethod(
    customerId, 
    paymentMethodId,
  ) 
  res.send({
    paymentMethod: paymentMethod
  })
})

module.exports = router;
