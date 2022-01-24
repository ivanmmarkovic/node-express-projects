const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('./models/User');


const login = async (req, res, next) => {
    try {
        let {username, password} = req.body;
        let user = await UserModel.findOne({username});
        if(user == null){
            res.status(404).json({message: `User with ${username} not found`});
        }
        let matches = await bcrypt.compare(password, user.password);
        if(!matches){
            res.status(400).json({message: 'Invalid password'});
        }
        let token = jwt.sign({username, id: user._id}, global.jwtKey, {
            algorithm: "HS256",
            expiresIn: global.jwtExpires
        });
        res.set("Authorization", "Bearer " + token);
        res.status(200).json(null);
    } catch (error) {
        next(error);
    }
};


const logout = async (req, res, next) => {
    try {
        const token = jwt.sign({username: "", id: 0}, global.jwtKey, {
            algorithm: "HS256",
            expiresIn: 0
        });
        res.set("Authorization", "Bearer " + token);
        res.status(200);
        res.send(null);
    } catch (error) {
        next(error);   
    }
};

module.exports = {
    login,
    logout
};