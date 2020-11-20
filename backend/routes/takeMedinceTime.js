const verifyToken = require('./verifyToken');

const router = require('express').Router();
const Event = require('../models/Event');


router.get('/', async (req, res) => {
    const result = await Event.find({});
    res.json(result);
});
router.post('/', async (req, res) => {
    console.log(req.body)
    const result = await Event.create(req.body);
    res.json(result);
});

router.put('/:id', async (req, res) => {
    const filter = { _id: req.params.id };
    await Event.findOneAndUpdate(filter, req.body);
    res.send(200);
});

router.delete('/:id', async (req, res) => {
    const filter = { _id: req.params.id };
    await Event.findOneAndRemove(filter);
    res.send(200);
});

module.exports = router;