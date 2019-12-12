const express = require('express'); //import express from 'express'; would be the way to do it if node.js had es2015 modules (which can be used in react)
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/user');
require('./services/passport'); // has no const because there is no return - just running that code

console.log("Mongo URI: " + keys.mongoURI);
mongoose.connect(keys.mongoURI,{ useNewUrlParser: true, useUnifiedTopology: true  });

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);//this is valid because the passport file returns a method, so we are then running that method with app right when we get it


const PORT = process.env.PORT || 5000; //This is saying use the environment variable from heroku, otherwise use 5000
app.listen(PORT);