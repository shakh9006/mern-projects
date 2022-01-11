const mongoose = require('mongoose');

const List = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    typeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    checked: {
        type: Boolean,
        default: false
    }
}, {timestamp: true});

module.exports = mongoose.model('List', List);