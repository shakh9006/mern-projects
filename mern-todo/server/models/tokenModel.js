const mongoose = require('mongoose');

const tokenModel = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Token', tokenModel);