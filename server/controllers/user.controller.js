// !----------------- Import section for User Controller-------------------------
const router = require("express").Router();
const User = require("../models/user.model");
// bcryt is the password hashing we are using
const bcrypt = require("bcryptjs");
// jwt is the web token we are using
const jwt = require("jsonwebtoken");
// const Token = require("../models/restettokenmodel");
// const sendEmail = require("../utils/email/sendEmail");


// Middleware we have created to check if someone is logged in
const validateSession = require("../middleware/validate-session");
const adminCheck = require("../middleware/adminCheck");

//! Creating a route that is a POST ("/signup")
// Creating a user
router.post("/signup", async (req, res) => {
  try {
    //1. Creating a new object based off the User Model Schema (ie User).
    let user = await User.findOne({ email: req.body.email });
    if (user) {
    throw new Error("An account with this email already exists")
    }
    user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    const newUser = await user.save();
    // After we generate a NEW user we will generate a token to identify that user
    const token = jwt.sign(
      { id: newUser._id, isAdmin: newUser.isAdmin, isCharity:newUser.isCharity, customerId:newUser.customerId, setupId: newUser.setupId },
      process.env.JWT,
      {
        expiresIn: 600000 * 60 * 24,
      }
    );
    // Success response, status 201 user created
    res.status(201).json({
      user: newUser,
      message: "Success",
      token: token,
    });
    // Error response, status 400 because client gave bad or incomplete data.
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//! Creating a ('/login') route POST ------------------------------------------------
// endpoint to login
router.post("/login", async (req, res) => {
  try {
    // 1. Check our database to see if the email that is supplied in the body is found in our database
    const user = await User.findOne({ email: req.body.email });
    // We don't find an email we exit and throw an ERROR
    if (!user) {
      throw new Error("Email Not Found");
    }
    //    validate that password matches otherwise send a response that we don't have a match
    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    //If passwords do not match we throw an ERROR
    if (!isPasswordMatch) {
      throw new Error("Incorrect Password");
    }
    // If all our checks are passed we will provide a token to the user upon successful login
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
        isCharity: user.isCharity,
        customerId: user.customerId,
      },
      process.env.JWT,
      {
        expiresIn: 600000 * 60 * 24,
      }
    );
    // Successful login status
    res.status(202).json({ user: user, message: "Success", token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// ! Update a user endpoint . for updating email and password --------------------------------------
router.patch("/update/:id", validateSession, async (req, res) => {
  try {
    // finding the user by id
    const userToUpdate = await User.findById({ _id: req.params.id });
    // if user not found
    if (!userToUpdate) {
      res.status(404).json({ message: "User not found" });
      return;
    }
   
    // checking to see if the user is the creator or an admin. If they aren't, they get an error.
    if (
      !req.user.isAdmin &&
      req.user._id.toString() != userToUpdate._id.toString()
    ) {
      res
        .status(403)
        .json({ message: "You do not have permission to update that user." });
      return;
    }
    // checking that passwords match
    const isPasswordMatch = await bcrypt.compare(
      req.body.currentPassword,
      userToUpdate.password
    );
    //If passwords do not match we throw an ERROR
    if (!isPasswordMatch) {
      throw new Error("Current password is incorrect");
    }
    // Creating a filter to retrieve user
    const filter = { _id: req.params.id };
    // If a password is changed, it will be hashed.
    if (req.body.newPassword) {
      req.body.password = bcrypt.hashSync(req.body.newPassword, 10);
    }
    const update = req.body;
    const returnOptions = { new: true };
    // using method find one and update to make the appropriate changes.
    const user = await User.findOneAndUpdate(filter, update, returnOptions);

    res.status(202).json({ message: "User updated", updatedUser: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ! Delete a user endpoint --------------------------------------
router.delete("/delete/:id", validateSession, async (req, res) => {
  try {
    // finding the user we want to delete
    const userToDelete = await User.findById({ _id: req.params.id });
    // if that user doesn't exist
    if (!userToDelete) {
      res.status(404).json({ massage: "user not found" });
      return;
    }
    // if the user is not an admin/ the creator of the user.
    if (
      !req.user.isAdmin &&
      req.user._id.toString() != userToDelete._id.toString()
    ) {
      res
        .status(403)
        .json({ message: "You do not have permission to delete that user." });
      return;
    }
    // delete the user using the method of delete one based on the params.
    const deletedUser = await User.deleteOne({ _id: req.params.id });
    res.status(200).json({
      userThatWasDeleted: userToDelete,
      deletedUser: deletedUser,
      message:
        deletedUser.deletedCount > 0
          ? "User was deleted"
          : "User was not removed",
    });
  } catch (error) {
    // if there's a server error
    res.status(500).json({ message: error.message });
  }
});

// ! Get current User
router.get("/me", validateSession, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user._id });
    res.status(200).json({
      user: user,
      message: "Success",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ! Get one User --------------------------------------------
router.get("/:id", adminCheck, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    res.status(200).json({
      user: user,
      message: "Success",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ! Get all Users---------------------------------------------------
router.get("/", adminCheck, async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json({
      allUsers: user,
      message: "Success, all users displayed",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ! Forgot password -----------------------------------------
router.post("/forgotpassword", async (req, res, next) => {
  try {
    const { email } = req.body
    console.log(email)
    const user = await User.findOne({ email });
 

    if (!user) {
      throw new Error("Email does not exist");
    }
    const secret = process.env.JWT + user.password
    const payload = {
      email: user.email,
      id: user._id
   
    }
    const token = jwt.sign(payload, secret, { expiresIn: '15m' })
    console.log(token);
    const link = `http://localhost:3000/resetpassword/${user._id}/${token}`
    console.log(link)
    res.status(200).json({
      message: 'Password reset link has been sent to your email.',
  link: link  })
     
    // let token = await Token.findOne({ userId: user._id });
    // if (token) { 
    //       await token.deleteOne()
    // };
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});
 

router.get("/resetpassword/:id/:token", async (req, res) => {
  const { id, token } = req.params
const user = await User.findOne({ _id: id });
  if (!user) {
    res.send({
      message: "Invalid id"
    })
    return
  }
  const secret = process.env.JWT + user.password
  try {
   const payload= jwt.verify(token, secret)
    res.status(200).json({
      message: "Success",
      email: user.email
    })
   
  }
  catch (error) {
    
    res.send(error.message)
  }
  })


  // !----------------------------
  router.post("/resetpassword/:id/:token", async (req, res) => {
    const { id, token } = req.params;

    const user = await User.findById({ _id: id });
    if (!user) {
      res.send("User not found");
      return;
    }
    const secret = process.env.JWT + user.password;
    try {
      const payload = jwt.verify(token, secret);
      const filter = { _id: id };
      if (req.body.newPassword) {
         req.body.password = bcrypt.hashSync(req.body.newPassword, 10);
      }
      const update = req.body;
      const returnOptions = { new: true };
      const user = await User.findOneAndUpdate(filter, update, returnOptions);

      res.status(202).json({ message: "Password updated", updatedUser: user });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
    }
    
});
      
    


//!Exporting the router
module.exports = router;

