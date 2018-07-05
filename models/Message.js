const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const MessageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    score:{
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Message = mongoose.model('message', MessageSchema);