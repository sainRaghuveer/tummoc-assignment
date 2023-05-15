const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const UserModel = require('../model/user.model');
const ExtractJWT = require("passport-jwt").ExtractJwt;
const JWTstrategy = require("passport-jwt").Strategy;


//Signup middleware
passport.use("signup", new localStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
    try {
        const alreadyUser = await UserModel.findOne({ email });
        if (alreadyUser) {
            return done(null, false, { message: "User is already exists" });
        }
        const user = await UserModel.create({ email, password });
        return done(null, user);
    } catch (error) {
        done(error);
    }
}
)
);

//login middleware
passport.use("login", new localStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return done(null, false, { message: "User not found try again with correct credentials" });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
            return done(null, false, { message: "Password is wrong" });
        }

        return done(null, user, { message: 'User logged in Successful' });
    } catch (error) {
        return done(error);
    }
}
)
);


passport.use(new JWTstrategy({ secretOrKey: 'TOP_SECRET', jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token') }, async (token, done) => {
    try {
        return done(null, token.user);
    } catch (error) {
        done(error);
    }
}
)
);