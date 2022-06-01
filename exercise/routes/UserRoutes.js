

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router 
    .route('/users')
        .post(UserController.createUser)
        .get(UserController.getAllUsers);

router 
    .route('/users/:id')
        .get(UserController.getUserById)
        .patch(UserController.patchUserById)
        .delete(UserController.deleteUserById);


module.exports = router;