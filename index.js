const express = require('express'); //import express from 'express'; would be the way to do it if node.js had es2015 modules (which can be used in react)
require('./services/passport'); // has no const because there is no return - just running that code

const app = express();

require('./routes/authRoutes')(app);//this is valid because the passport file returns a method, so we are then running that method with app right when we get it


const PORT = process.env.PORT || 5000; //This is saying use the environment variable from heroku, otherwise use 5000
app.listen(PORT);