const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    songSource: {
        type: String,
        required: true
    },
    imageSource: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Songs', songSchema);