const HeartRateRecord = require('../models/HeartRateRecord');
const express = require('express');
const router = express.Router();

// Upload heart rate record
router.post('/heart_rate_record', async (req, res) => {
    const heartRateRecord = new HeartRateRecord({
        email: req.body.email,
        value: req.body.value
    })
    await heartRateRecord.save();
    res.status(200).send({ success: true })
})

// Get latest hear rate records
router.get('/heart_rate_record', async (req, res) => {
    const heartRateRecords = await HeartRateRecord
        .find({
            email: req.query.email,
            // createdAt: { $gte : new Date(req.query.date) }
        })
        .sort({'createdAt': -1})
        .limit(parseInt(req.query.limit))
    res.status(200).send(heartRateRecords)
})

module.exports = router;