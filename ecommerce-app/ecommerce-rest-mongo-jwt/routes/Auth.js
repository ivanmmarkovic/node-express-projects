
const router = require('express').Router();
const UserModel = require('../models/User');
const CryptoJS = require("crypto-js");

router.post('/register', async (req, res) => {

    // you can validate request data here
    const newUser = new UserModel({
        username: req.body.username,
        email: req.body.email,
        // password: req.body.password
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
          ).toString(),
    });

    try {
        const savedUser = await newUser.save();
        return res.status(201).json(savedUser);
    } catch (error) {
        return res.status(500).json(err);
    }

});

module.exports = router;