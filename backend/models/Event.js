const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Number,
        required: true,
    },
    notified: {
        type: Boolean,
        default: false
    },
    desc: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Events', eventSchema);