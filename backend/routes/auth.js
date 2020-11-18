const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();
const UserDetails = require('../models/UserDetails');
//HeartRate
const HeartRate = require('../models/HeartRate');


//token
const generateToken = user => {
    return jwt.sign({ _id: user._id, email: user.email, name: user.name }, 'SUPERSECRET123');
}

// const loginValidation = [
//     check('email')
//         .isEmail()
//         .withMessage('Please provide a valid email'),
//     check('password')
//         .isLength({ min: 6 })
//         .withMessage('Password must be at least six characters')
// ]

router.post('/register', async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let userEmailExist
    try {
        console.log(req.body.email)
        userEmailExist = await UserDetails.findOne({ email: req.body.email });
    }
    catch (error) {
        console.log(error)
    }

    if (userEmailExist)
        return res.status(401).json({
            success: false,
            message: 'Email Exist'
        });

    var post = req.body;
    const salt = await bcrypt.genSaltSync(10);
    const password = await post.password;

    const obj = new UserDetails({
        name: post.name,
        email: post.email,
        password: bcrypt.hashSync(password, salt)
    })

    await obj.save();

    res.status(200).json({
        success: true,
        message: 'Register Success'
    });
    res.send();
});


router.post('/login', async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    console.log(req.body.email)
    // check if email exist
    const user = await UserDetails.findOne({ email: req.body.email })
    if (!user) return res.status(404).send({ success: false, message: "User is not registered" })

    // check if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(405).send({ success: false, message: "Invalid Email or Password" })

    // create and assign a token
    const token = generateToken(user);
    res.header('auth-token', token).send({ success: true, message: 'Logged in successfully', token, user })
})

// heartRate chart
router.post('/HeartRate', async (req, res) => {
    // const obj = new HeartRate({
    //     email: "demo@gmail.com",
    //     monday: "85",
    //     tuesday:"80",
    //     wednesday:"87",
    //     thursday:"88",
    //     friday:"86",
    //     saturday:"88",
    //     sunday:"90"
    // })   
    // await obj.save();

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    console.log("-0000000-")
    console.log(req.body.email)
    // check if email exist
    const user = await HeartRate.findOne({ email: req.body.email })
    if (!user) return res.status(404).send({ success: false, message: "User is not registered" })
    console.log(user)
    res.status(200).send({ success: true, user })
})


module.exports = router;