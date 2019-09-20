const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//Specific Routers
const urlRouter = require("../routes/url-routes");
const userRouter = require("../routes/user-routes");
const statsRouter = require("../routes/stats-routes");

app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//The DB provided here has a maximum 50mb and is regularly wiped. Dont forget to set your enviroment variables if you wish to do more extensive testing
mongoose.connect( process.env.connect || "mongodb+srv://admin:admin12345@mongoaws-l3ons.mongodb.net/test?retryWrites=true&w=majority");

//URL paths
app.use("/urls", urlRouter);
app.use("/users", userRouter);
app.use("/stats", statsRouter);

module.exports = app;