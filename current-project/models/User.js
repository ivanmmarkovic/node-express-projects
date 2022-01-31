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
    role: {
        type: String,
        required: true,
        enum: ['admin', 'user']
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