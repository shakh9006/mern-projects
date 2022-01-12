const mongoose = require('mongoose');

const Color = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true,
    },
}, {timestamp: true});

module.exports = mongoose.model('Color', Color);