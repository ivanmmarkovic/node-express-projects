const express = require('express');
const router = express.Router();

const UserController = require('../controllers/User');

const auth = require('../middlewares/Auth');

router 
    .route('/')
        .post(UserController.create)
        .get(UserController.findAll);

router 
    .route('/:id')
        .get(UserController.findById)
        .patch(auth, UserController.updateById)
        .delete(auth, UserController.deleteById);

module.exports = router;