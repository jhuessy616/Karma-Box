// ! Importing mongoose
const mongoose = require("mongoose");
// ! We are defining the fields that will be in our collection (AKA Table)
// Setting up UserSchema to have firstName, lastName, userName, email, password, isAdmin
const DonationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: String,
    default: new Date().toLocaleDateString(),
  },
  fullDate: {
    type: String,
    default: new Date().toLocaleString(),
  },
  organization: {
    type: String,
  },
  amount: {
    type: Number,
  },
});
// !Exporting UserSchema
module.exports = mongoose.model("Donation", DonationSchema);