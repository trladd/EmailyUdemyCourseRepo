const express = require('express'); //import express from 'express'; would be the way to do it if node.js had es2015 modules (which can be used in react)
const app = express();

app.get('/', (req, res) => {
    res.send({
        hi: 'there'
    });
});

app.listen(5000);