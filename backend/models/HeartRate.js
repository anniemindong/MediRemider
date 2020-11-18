const mongoose = require('mongoose');

const HeartRate = new mongoose.Schema({
    email: { type: String },
    monday: { type: String },
    tuesday: { type: String },
    wednesday: { type: String },
    thursday: { type: String },
    friday: { type: String },
    saturday: { type: String },
    sunday: { type: String },

});
module.exports = mongoose.model("HeartRate", HeartRate);