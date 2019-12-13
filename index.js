const express = require('express'); //import express from 'express'; would be the way to do it if node.js had es2015 modules (which can be used in react)
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/user');
require('./services/passport'); // has no const because there is no return - just running that code

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
app.use(bodyParser.json());

require('./routes/authRoutes')(app);//this is valid because the passport file returns a method, so we are then running that method with app right when we get it
require('./routes/billingRoutes')(app);//again returns a function that immediatly runs passing app to the function

//reason for only doing this in production is because we don't want to run npm build on client each time to see changes in dev
if (process.env.NODE_ENV === 'production'){
    // express will serve up production assests like main.js file ro main.css file
    app.use(express.static('client/build'));
    //express will serve up index.html file if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000; //This is saying use the environment variable from heroku, otherwise use 5000
app.listen(PORT);