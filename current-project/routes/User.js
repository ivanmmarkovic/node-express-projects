const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User');

router 
    .route('/')
        .post(UserController.create);


module.exports = router;