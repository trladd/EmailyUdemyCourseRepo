const express = require('express'); //import express from 'express'; would be the way to do it if node.js had es2015 modules (which can be used in react)
const app = express();

app.get('/', (req, res) => {
    res.send({
        hi: 'there updated'
    });
});

const PORT = process.env.PORT || 5000; //This is saying use the environment variable from heroku, otherwise use 5000
app.listen(PORT);