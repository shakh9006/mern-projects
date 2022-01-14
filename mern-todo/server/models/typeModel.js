const mongoose = require('mongoose');

const Type = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    colorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Color'
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, {timestamp: true});

module.exports = mongoose.model('Type', Type);