const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const router = express.Router();

router.post("/signup", (req, res, next) => {
    passport.authenticate("signup", (err, user, info) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      if (!user) {
        return res.status(401).json({ message: info.message });
      }
      res.json({
        message: "User signup successful",
        user: user,
      });
    })(req, res, next);
  }
);


router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");

        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, "TOP_SECRET");

        res.cookie("jwt", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        });
        return res.json({ message: "User login successful", user });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});


router.post("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.json({ message: "Logout successful" });
});


module.exports = router;