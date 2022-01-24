
const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');
const authMiddleware = require('../middleware/AuthMiddleware');

router 
    .route('/users')
        .post(UserController.create)
        .get(UserController.findAll);

router 
    .route('/users/:id')
        .patch(authMiddleware, UserController.updateById)
        .get(UserController.findById)
        .delete(authMiddleware, UserController.deleteById);

module.exports = router;