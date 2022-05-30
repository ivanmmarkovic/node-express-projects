const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
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