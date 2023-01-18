// ! Importing jwt and User model
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// ! checking if user is admin using token
const adminCheck = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = await jwt.verify(token, process.env.JWT);
    const user = await User.findById(decodedToken.id);
    // if no matching user
    if (!user) {
      throw Error("User not found");
    }
    // if the user is not an admin
    if (!user.isAdmin) {
      throw Error("You are not an admin");
    }
    return next();
    // error message
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// exporting the admin check
module.exports = adminCheck;
