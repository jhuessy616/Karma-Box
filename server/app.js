// !--------------------------------Imports----------------------------------------------
// importing dotenv, express and controllers
require("dotenv").config();
const express = require("express");
const app = express();
const userController = require("./controllers/user.controller.js");
const cors = require("cors");

// import and connect to mongo database boilerplate
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGOOSE_URL);
const db = mongoose.connection;
mongoose.set("strictQuery", false);

// ! ---------------------------------Additional Boiler Plate---------------------------
// check to see the paths are working and seeing which database we are connected to
db.once("open", () => console.log("Connected to the database " + db.name));

// enable the express server to respond to preflight requests, need this for react to run properly.
app.use(cors());
// needed so we can access json objects
app.use(express.json());

// ! -------------------------------------Routes---------------------------------------------
// Defining our routes
app.use("/user", userController);

// !-------------------------------Server Listening-------------------------------------------
// having server listening
app.listen(process.env.PORT, function () {
  console.log(`YOURFILE app is listening on port ${process.env.PORT}`);
});
