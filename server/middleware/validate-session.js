// !Importing jwt and user model
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// ! Validating session using token
const validateSession = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = await jwt.verify(token, process.env.JWT);
    const user = await User.findById(decodedToken.id);
    // if no mstching user
    if (!user) {
      throw Error("user not found");
    }
    req.user = user;
    return next();
    // error message
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// export the validateSession
module.exports = validateSession;
