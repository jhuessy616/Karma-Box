// !--------------------------------Imports----------------------------------------------
// importing dotenv, express and controllers
require("dotenv").config();
const express = require("express");
const app = express();
const userController = require("./controllers/user.controller.js");
const stripeController = require('./controllers/stripe.controller.js')
const cors = require("cors");

// import and connect to mongo database boilerplate
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const db = mongoose.connection;
mongoose.connect(process.env.MONGOOSE_URL);



// ! ---------------------------------Additional Boiler Plate---------------------------
// check to see the paths are working and seeing which database we are connected to
db.once("open", () => console.log("Connected to the database " + db.name));

// enable the express server to respond to preflight requests, need this for react to run properly.
app.use(cors());
app.use(express.static('public'))
app.use(express.json());
app.use(express.static(process.env.STATIC_DIR));

// ! -------------------------------------Routes---------------------------------------------
// Defining our routes
app.use("/user", userController);
app.use("/api", stripeController)

// !-------------------------------Server Listening-------------------------------------------
// having server listening
app.listen(process.env.PORT, function () {
  console.log(`YOURFILE app is listening on port ${process.env.PORT}`);
});
