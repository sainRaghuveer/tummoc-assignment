const express = require("express");
const passport = require("passport");
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config();
var logger = require('morgan');
var session = require('express-session');
const path = require("path");

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const googleRoutes = require('./Routes/google.route');

//Creating app using express
const app = express();

//user route
const routes = require("./Routes/user.route");
const secureRoute = require("./Routes/user.secureroute");

//this will make connection with mongo database
const { connection } = require("./config/db");
const { fileRouter } = require("./Routes/filesystem.route");


app.use(cors());
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  })
);

//initializing passport
app.use(passport.initialize());
app.use(passport.session())
require("./middleware/authentication");


app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

//user route
app.use("/", routes);

//file route
app.use("/file", fileRouter);

//google auth route
app.use('/auth/google', googleRoutes);

// for verified users only
app.use("/user", passport.authenticate("jwt", { session: false }), secureRoute);

// handling errors.
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err.message });
});


//server
app.listen(process.env.port, async () => {
  try {
    await connection
    console.log("Connected with DB")
  } catch (error) {

  }
  console.log(`server running at ${process.env.port} PORT`);
});