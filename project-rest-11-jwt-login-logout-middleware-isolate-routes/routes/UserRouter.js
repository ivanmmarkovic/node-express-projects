
const express = require('express');
const router = express.Router();
const UserController = require('../controller/UserController');

router 
    .route('/users')
        .post(UserController.create)
        .get(UserController.findAll);

router 
    .route('/users/:id')
        .patch(UserController.updateById)
        .get(UserController.findById)
        .delete(UserController.deleteById);

module.exports = router;