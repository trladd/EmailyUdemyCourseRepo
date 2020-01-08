const mongoose = require('mongoose');
const {Schema} = mongoose; // equivalent of //const Schema = mongoose.Schema; by using javascript destructuring

const userSchema = new Schema({// will be able to create other properties to add them easily at any time in the future
    googleId: String,
    credits: { type: Number, default: 2 }
});

mongoose.model('users', userSchema); // puts user object into mongo