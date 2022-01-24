const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('./models/User');


const create = async (req, res, next) => {
    try {
        let {username, email, password} = req.body;
        password = await bcrypt.hash(password, 10);
        let createdAt = new Date();
        let updatedAt = new Date();
        let user = await UserModel.create({username, email, password, createdAt, updatedAt});
        const token = jwt.sign({username, id: user._id}, global.jwtKey, {
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
        next(error);
    }
};

const findById = async (req, res, next) => {
    try {
        let {id} = req.params;
        let user = await UserModel.findById(id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

const updateById = async (req, res, next) => {
    try {
        let {id} = req.params;
        let updatedAt = new Date();
        console.log(req.body);
        if(req.body.password != undefined){
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        let user = await UserModel.findByIdAndUpdate(id, {...req.body, updatedAt}, {new: true});
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

const deleteById = async (req, res, next) => {
    try {
        let {id} = req.params;
        await UserModel.findByIdAndDelete(id);
        res.status(204).json(null);
    }catch(error){
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