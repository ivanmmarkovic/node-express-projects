const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');

const login = async (req, res, next) => {
    try {
        let {username, password} = req.body;
        let user = await UserModel.findOne({username});
        const token = jwt.sign({username, id: user._id}, global.jwtKey, {
            algorithm: "HS256",
            expiresIn: global.jwtExpires
        });
        res.set("Authorization", "Bearer " + token);
        res.status(200);
        res.send(null);
    } catch (error) {
        next(error);
    }
};

const createUser =  async (req, res, next) => {
    try {
        let user = await UserModel.create({...req.body});
        const token = jwt.sign({username: user.username, id: user._id}, global.jwtKey, {
            algorithm: "HS256",
            expiresIn: global.jwtExpires
        });
        res.set("Authorization", "Bearer " + token);
        res.status(200);
        res.json({
            user
        })
    } catch (error) {
        next(error);
    }
};

const getUsers = async (req, res, next) => {
    try {
        let users = await UserModel.find();
        res.json({
            users
        });
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {
        let id = req.params.id;
        let user = await UserModel.findById(id);
        res.json({
            user
        });
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        let id = req.params.id;
        let user = await UserModel.findByIdAndUpdate(id, {...req.body});
        res.json({
            user
        });
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        let id = req.params.id;
        let user = await UserModel.findByIdAndDelete(id);
        res.json({
            user: null
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    login,
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};

