const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const router = express.Router();
require('dotenv').config();

// Passport configuration will happen here for google authentication
passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:8800/auth/google/callback',
    },

    (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        const user = {
            id: profile.id,
            name: profile.displayName,
        };

        done(null, user);
    }
)
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Google authentication route
router.get('/', passport.authenticate('google', { scope: ['profile'] })
);

// Google authentication callback route
router.get('/callback', passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        let user = req.user
        console.log('User authenticated:', user);
        res.redirect('http://localhost:3000/home');
    }
);

module.exports = router;
