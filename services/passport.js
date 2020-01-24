const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users'); // pulls the schema out of mongoose

/**
 * The difference between using cookie-session and express-session. Cookie-session stores it in the browser. Express session only stores
 * a reference to the session information in the browser cookie and so it will then store the session information on a serverside DB
 * Using express session will allow for more information to be stored while cookie-session is limited by browser cookie size limit
 */

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback', // keep in mind that this needs to be added as an allowed redirect URI on google for security concerns
    proxy: true
}, async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({
        providerUniqueID: profile.id,
        provider: profile.provider
    })
    if (existingUser) {
        existingUser.providerUniqueID = profile.id;
        existingUser.profileImageURL= profile._json.picture;
        existingUser.emailVerified= profile._json.email_verified;
        existingUser.email= profile._json.email;
        existingUser.lastName= profile.name.familyName;
        existingUser.firstName=profile.name.givenName;
        existingUser.name=profile.displayName;
        existingUser.accessToken=profile.accessToken;

        return done(null, existingUser);
    }
    const user = await new User(
        {
            providerUniqueID: profile.id,
            provider: profile.provider,
            accessToken,
            name: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile._json.email,
            emailVerified: profile._json.email_verified,
            profileImageURL: profile._json.picture
        }
        ).save();
    done(null, user); //this creates the user and saves them to the database
}));