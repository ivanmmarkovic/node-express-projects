
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/User');

const create = async (req, res, next) => {
    try {
        let {username, email, password} = req.body;
        password = await bcrypt.hash(password, 10);
        let user = await UserModel.create({username, email, password, role: 'user', createdAt: new Date(), updatedAt: new Date()});
        let token = jwt.sign({username: user.username, id: user._id, role: user.role}, global.jwtKey, {
            algorithm: "HS256",
            expiresIn: global.jwtExpires
        });
        res.set("Authorization", "Bearer " + token);
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }

};


const findAll = async (req, res, next) => {
    try {
        let users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        next(err);
    }
};

const findById = async (req, res, next) => {
    try {
        let {id} = req.params;
        let user = await UserModel.findById(id);
        res.status(200).json(user);
    } catch (error) {
        
    }
};

const updateById = async (req, res, next) => {
    try {
        let {id} = req.params;
        let {username, id: userId, role} = req.payload;
        if(userId != id){
            res.status(403).json({message: "Forbidden"})
        }
        console.log('-------------------------------', payload);
        if(req.body.password){
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        let user = await UserModel.findByIdAndUpdate(id, {...req.body, updatedAt: new Date()}, {new: true});
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

const deleteById = async (req, res, next) => {
    try {
        let {id} = req.params;
        let {username, id: userId, role} = req.payload;
        if(userId != id){
            if(role != 'admin'){
                res.status(403).json({message: "Forbidden"})
            }
        }
        console.log('-------------------------------', payload);
        let user = await UserModel.findByIdAndDelete(id);
        res.status(204).json(null);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    create,
    findAll,
    findById,
    updateById,
    deleteById
};
