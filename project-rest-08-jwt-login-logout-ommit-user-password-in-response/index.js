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

app.post('/users', async (req, res, next) => {
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
        res.status(201).json({...username, _id});
    } catch (error) {
        next(error);
    }
});

app.get('/users', async (req, res, next) => {
    try {
        let users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

app.get('/users/:id', async (req, res, next) => {
    try {
        let {id} = req.params;
        let user = await UserModel.findById(id);
        res.status(200).json({...username, _id});
    } catch (error) {
        next(error);
    }
});

app.patch('/users/:id', async (req, res, next) => {
    try {
        let {id} = req.params;
        let updatedAt = new Date();
        console.log(req.body);
        if(req.body.password != undefined){
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        let user = await UserModel.findByIdAndUpdate(id, {...req.body, updatedAt}, {new: true});
        res.status(200).json({...username, _id});
    } catch (error) {
        next(error);
    }
});

app.delete('/users/:id', async (req, res, next) => {
    try {
        let {id} = req.params;
        await UserModel.findByIdAndDelete(id);
        res.status(204).json(null);
    }catch(error){
        next(error);
    }
});

app.listen(5000, () => console.log('Listen on port 5000'));