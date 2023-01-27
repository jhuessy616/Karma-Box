// ! Importing mongoose
const mongoose = require("mongoose");
// ! We are defining the fields that will be in our collection (AKA Table)
// Setting up UserSchema to have firstName, lastName, userName, email, password, isAdmin
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    }, 
  customerId: {
    type: String,
    default: "" 
  },
  setupId: {
    type: String,
    default: ""
  },
  paymentMethodId: {
    type: String,
    default: ""
  },
   isAdmin: {
    type: Boolean,
       default: false,
    },
    isCharity: {
        type: Boolean,
        default:false,
   }
});
// !Exporting UserSchema
module.exports = mongoose.model("User", UserSchema);
