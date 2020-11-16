const express = require('express');
const mongoose = require('mongoose')

const app = express();

app.use(express.json());

const authRoutes = require('./routes/auth');
const verifyToken = require('./routes/verifyToken');

app.get('/', (req, res) => {
    res.send('Welcome to the medi reminder system');
})

app.get('/user/profile', verifyToken, (req, res) => {
    console.log(req.user)
    res.send({ success: true, data: req.user });
})

app.use('/user', authRoutes);
app.use('/event', require('./routes/takeMedinceTime'))

mongoose.connect('mongodb+srv://king_auth:7KckJMsEXKqhV8u@cluster0.f7nsr.mongodb.net/mediReminder?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(3000, () => console.log('Server is running'));
    })
    .catch(err => console.log(err))

