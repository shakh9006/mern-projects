const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    isActivated: {
        type: Boolean,
        default: false
    },
    activationLink: {
        type: String,
        required: true,
    }

}, {timestamps: true});

module.exports = mongoose.model('User', userModel);