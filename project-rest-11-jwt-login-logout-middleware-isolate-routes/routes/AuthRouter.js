const express = require('express');
const router = express.Router();
const AuthController = require('../controller/AuthController');
const authMiddleware = require('../middleware/AuthMiddleware');

router 
    .route('/login')
        .post(AuthController.login);

router 
    .route('/logout')
        .post(authMiddleware, AuthController.logout);


module.exports = router;
