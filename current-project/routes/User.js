const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User');

router 
    .route('/')
        .post(UserController.create)
        .get();



module.exports = router;