const mongoose = require('mongoose');

const HeartRateRecord = new mongoose.Schema(
    {
        email: { type: String },
        value: { type: Number }
    },
    { timestamps: true }
);
module.exports = mongoose.model("HeartRateRecord", HeartRateRecord);