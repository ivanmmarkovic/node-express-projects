const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        unique: true,
        min: 3,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    updatedAt: {
        type: Date
    },
    createdAt: {
        type: Date
    }
});


const UserModel = mongoose.model('UserModel', UserSchema);

module.exports = UserModel;