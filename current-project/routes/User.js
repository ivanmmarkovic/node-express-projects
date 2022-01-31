const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User');

router 
    .route('/')
        .post(UserController.create)
        .get(UserController.findAll);

router 
    .route('/:id')
        .get(UserController.findById)
        .patch(UserController.updateById)
        .delete(UserController.deleteById);

module.exports = router;