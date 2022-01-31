const UserModel = require('../models/User');


const create = async (req, res, next) => {
    try {
        let {username, email, password} = req.body;
        let user = await UserModel.create({username, email, password, createdAt: new Date(), updatedAt: new Date()});
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }

};


const findAll = async (req, res, next) => {
    try {
        let users = await UserModel.findAll();
        res.status(200).json(users);
    } catch (error) {
        next(err);
    }
};

const findById = async (req, res, next) => {
    try {
        let {id} = req.params;
        let user = await UserModel.findbyId(id);
        res.status(200).json(user);
    } catch (error) {
        
    }
};

const updateById = async (req, res, next) => {
    try {
        let {id} = req.params;
        let {username, email}
        let user = await UserModel.findByIdAndUpdate(id, {...req.body, updatedAt: new Date()}, {new: true});
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

const deleteById = async (req, res, next) => {
    try {
        let {id} = req.params;
        let {username, email}
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
