
const router = require('express').Router();
const UserModel = require('../models/User');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res, next) => {
    /*
    const user = await new UserModel({
        username: "john",
        email: "john@example.com",
        password: "12345"
    });

    await user.save();
    return res.status(201).json(user);
    */


    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = await new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        await user.save();
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json(error);
    }

});

router.post('/login', async(req, res, next) => {
    try {
        const user = await UserModel.findOne({email: req.body.email});
        if(!user){
            return res.status(404).json('User not found');
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword){
            return res.status(400).json('Wrong password');
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
});


module.exports = router;