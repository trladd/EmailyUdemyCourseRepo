const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users'); // pulls the schema out of mongoose

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null,user);
        });
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback' // keep in mind that this needs to be added as an allowed redirect URI on google for security concerns
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({
            googleId: profile.id
        })
        .then((existingUser) => { // .then is a promise which will help with the asynchronous call
            if (existingUser) {
                //we already have a record with the given profile ID
                done(null,existingUser);
            } else {
                //we don't have a user already
                new User({
                    googleId: profile.id
                }).save()
                .then(user => done(null, user)); //this creates the user and saves them to the database
            }
        })

}));