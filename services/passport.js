const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users'); // pulls the schema out of mongoose

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback' // keep in mind that this needs to be added as an allowed redirect URI on google for security concerns
}, (accessToken, refreshToken, profile, done) => {
    console.log('access token: ', accessToken);
    console.log('refresh token: ', refreshToken);
    console.log('profile:  ', profile);
    User.findOne({
            googleId: profile.id
        })
        .then((existingUser) => { // .then is a promise which will help with the asynchronous call
            if (existingUser) {
                //we already have a record with the given profile ID
            } else {
                //we don't have a user already
                new User({
                    googleId: profile.id
                }).save(); //this creates the user and saves them to the database
            }
        })

}));