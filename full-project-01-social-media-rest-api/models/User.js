

const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 20
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    profilePicture: {
        type:String,
        default: ""
    },
    coverPicture: {
        type:String,
        default: ""
    },
    followers: {
        tye:Array,
        default: []
    },
    followed: {
        tye:Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const UserModel = mongoose.model('UserModel', UserSchema);

module.exports = UserModel;