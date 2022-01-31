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



module.exports = {
    create
};
