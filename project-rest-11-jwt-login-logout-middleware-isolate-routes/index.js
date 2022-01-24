const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


mongoose.connect('mongodb://admin:password@localhost:27017/articles?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

global.jwtKey = "secret";
global.jwtExpires = 24 * 60 * 60 * 1000;

const UserModel = require('./models/User');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let authMiddleware = (req, res, next) => {
    let bearer = req.header("Authorization");
    if(!bearer){
        res.status(401);
        res.send({message: "Unauthorized"});
    }
    try {
        let [, token] = bearer.split(" ");
        payload = jwt.verify(token, global.jwtKey);
        // add payload to req
        req.payload = payload;
        next();
    } catch (error) {
        if(error instanceof jwt.JsonWebTokenError){
            res.status(401);
            return res.send({message: "Unauthorized"});
        }
        else{
            res.status(400);
            return res.send({message: "Bad Request"});
        }
    }
};

app.post("/login", async (req, res, next) => {
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
});

app.post("/logout", async (req, res, next) => {
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
});

app.get("/public", async (req, res, next) => {
    res.status(200).json({message: "Public page"});
});

app.get("/protected", authMiddleware, async (req, res, next) => {
    // payload is set on req object in authMiddleware
    console.log(req.payload);
    res.status(200).json({message: "Protected page"});
});


app.listen(5000, () => console.log('Listen on port 5000'));