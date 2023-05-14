const express = require("express");
const passport = require("passport");
const cors = require("cors");
const bodyParser = require("body-parser");


//Creating app using express
const app = express();

//user route
const routes = require("./Routes/user.route");
const secureRoute = require("./Routes/user.secureroute");

//this will make connection with mongo database
const { connection } = require("./config/db");

app.use(cors());
app.use(passport.initialize());
require("./middleware/authentication");

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", routes);

// for verified users only
app.use("/user", passport.authenticate("jwt", { session: false }), secureRoute);

// handling errors.
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

//server
app.listen(process.env.port, async() => {
    try{
        await connection
        console.log("Connected with DB")
    }catch(error){

    }
  console.log(`server running at ${process.env.port} PORT`);
});