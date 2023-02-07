require("dotenv").config();
const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const jwt = require("jsonwebtoken");
const validateSession = require("../middleware/validate-session");
const User = require("../models/user.model");
const Donation = require("../models/donation.model");

router.get("/config", validateSession, (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

router.post("/create-setup-intent", validateSession, async (req, res) => {
  try {
    //create a customer with stripe
    const user = req.user._id;
    const email = req.user.email
    const customer = await stripe.customers.create({
      description: "test customer",
      metadata: { user: `${user}` },
      email: email
    });

    console.log(customer);
    const setupIntent = await stripe.setupIntents.create({
      customer: customer.id,
      payment_method_types: ["card"],
      metadata: { user: `${user}` }
    });


    // update the entry in the user model with there customer id and setupintent id
    const filter = { _id: user };
    const update = { customerId: customer.id, setupId: setupIntent.id };
    const returnOptions = { new: true };
    const updatedUser = await User.findOneAndUpdate(
      filter,
      update,
      returnOptions
    );


    const token = jwt.sign(
      {
        id: updatedUser._id,
        isAdmin: updatedUser.isAdmin,
        isCharity: updatedUser.isCharity,
        customerId: updatedUser.customerId,
        setupId: updatedUser.setupId,
        paymentMethodId: updatedUser.paymentMethodId,
      },
      process.env.JWT,
      {
        expiresIn: 600000 * 60 * 24,
      }
    );
    res.send({
      token: token,
      setupIntent: setupIntent,
      customer: setupIntent.customer,
    });
  } catch (error) {
    return res.status(400).send({
      error: {
        message: error.message,
      },
    });
  }
});

router.post("/create-payment-intent-guest", async (req, res) => {
    try {
        const amount = req.body.amount;
        console.log(amount)
        const amountToCharge = parseInt(amount) * 100;
        const paymentIntent = await stripe.paymentIntents.create({
            currency: "USD",
            amount: amountToCharge,
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

router.post("/create-payment-intent", validateSession, async (req, res) => {
  try {
    const amount = req.body.amount;


    const organization =
      // "Help Jonas Breen"
      req.body.organization;
    console.log(req.body);
    const amountToCharge = parseInt(amount) * 100;

    console.log('amount: ', amount)
    console.log(req.body)

    const paymentIntent = await stripe.paymentIntents.create({
      payment_method: req.user.paymentMethodId,
      customer: req.user.customerId,
      currency: "USD",
      amount: +amount * 100,
      off_session: true,
      confirm: true,
    });


    let donation = new Donation({
      user: req.user._id,
   
      organization: organization,
      amount: amount,
    });
    const newDonation = await donation.save();

    

    res.send({
      clientSecret: paymentIntent.client_secret,
      paymentIntent: paymentIntent,
    });
  } catch (error) {
    return res.status(400).send({
      error: {
        message: error.message,
      },
    });
  }
});

router.get("/customers/:id", validateSession, async (req, res) => {
  try {
    const customerId = req.user.customerId;
    const customer = await stripe.customers.retrieve(customerId);
    res.send({
      customer: customer,
    });
  } catch (error) {
    res.status(400).send({
      error: {
        message: error.message,
      },
    });
  }
});

router.get(
  "/customers/:customer/payment_methods",
  validateSession,
  async (req, res) => {
    try {

      const customerId = req.user.customerId;
      const paymentMethod = await stripe.customers.listPaymentMethods(
        customerId
      );
      res.send({
        paymentMethod: paymentMethod,
        
      });

    } catch (error) {
      res.status(400).send({
        error: {
          message: error.message,
        },
      });
    }

  }
);

router.post("/payment_methods/attach", validateSession, async (req, res) => {
  try {
    const customerId = req.user.customerId;
    const paymentMethodId = req.user.paymentMethodId;
    const paymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });

    res.send({
      paymentMethod: paymentMethod.id,
    });
  } catch (error) {
    res.status(400).send({
      error: {
        message: error.message,
      },
    });
  }
});


router.get("/setup_intents/:id", validateSession, async (req, res) => {
  const user = req.user._id;
  const setupId = req.params.id;
  console.log(setupId);
  const setupIntent = await stripe.setupIntents.retrieve(setupId);
  console.log(setupIntent.payment_method);
  const filter = { _id: user };
  const update = { paymentMethodId: setupIntent.payment_method };
  const returnOptions = { new: true };
  const updatedUser = await User.findOneAndUpdate(
    filter,
    update,
    returnOptions
  );

  const token = jwt.sign(
    {
      id: updatedUser._id,
      isAdmin: updatedUser.isAdmin,
      isCharity: updatedUser.isCharity,
      customerId: updatedUser.customerId,
      setupId: updatedUser.setupId,
      paymentMethodId: updatedUser.paymentMethodId,
    },
    process.env.JWT,
    {
      expiresIn: 600000 * 60 * 24,
    }
  );
  res.send({
    token: token,
    setupIntent: setupIntent,
    paymentMethodId: setupIntent.paymentMethodId,
  });
});

router.get('/payment_intents', validateSession, async(req, res) => {
  const user = req.user._id;
  const customer = req.user.customerId
  const paymentIntents = await stripe.paymentIntents.list({
    customer: customer
  })
  res.send({
    paymentIntents: paymentIntents
  })
})

router.post('/payment_methods/:id', validateSession, async (req, res) => {
  try {  
    const user = req.user._id
    const paymentId = req.user.paymentMethodId
    const paymentMethod = await stripe.paymentMethods.update(
      paymentId,
      {card: {}}
    )
    res.send({paymentMethod})
  } catch (error) {
    res.status(400).send({
      error: {
        message: error.message,
      },
    });
  }
})

router.get('/setup_intents', validateSession, async(req, res) => {
  const customer = req.user.customerId
  const paymentId = req.user.paymentMethodId
  const setupIntents = await stripe.setupIntents.list({
    customer,
    paymentId
  })
  res.send({
    setupIntents
  })
})

router.post('/billing_portal/sessions', validateSession, async(req, res) => {
  console.log(req.user.customerId)
  const session = await stripe.billingPortal.sessions.create({
    customer: req.user.customerId,
    return_url: 'http://localhost:3000/profile'
  })
  res.redirect(session.url);
})

module.exports = router;
