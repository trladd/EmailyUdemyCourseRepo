const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback' // keep in mind that this needs to be added as an allowed redirect URI on google for security concerns
}, (accessToken, refreshToken, profile, done) => {
    console.log('access token: ', accessToken);
    console.log('refresh token: ', refreshToken);
    console.log('profile:  ' , profile);
}));