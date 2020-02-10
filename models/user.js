const mongoose = require('mongoose');
const {Schema} = mongoose; // equivalent of //const Schema = mongoose.Schema; by using javascript destructuring

const userSchema = new Schema({// will be able to create other properties to add them easily at any time in the future
    providerUniqueID: String,
    provider: String,
    accessToken: String,
    credits: { type: Number, default: 2 },
    name: String,
    firstName: String,
    lastName: String,
    email: String,
    emailVerified: String,
    profileImageURL: String,
    isAdmin: { type: Boolean, default: false }
});

mongoose.model('users', userSchema); // puts user object into mongo