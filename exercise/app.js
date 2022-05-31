const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

mongoose.connect('mongodb://admin:password@localhost:27017/articles?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

global.jwtKey = "secret";
global.jwtExpires = 24 * 60 * 60 * 1000;


app.post('/login', async (req, res, next) => {
    try {
        let {email, password} = req.body;
        let user = await UserModel.findOne({email});
        if(user == null){
            res.status(404).json({message: `User with ${username} not found`});
        }
        let matches = await bcrypt.compare(password, user.password);
        if(!matches){
            res.status(400).json({message: 'Invalid password'});
        }
        let token = jwt.sign({username: user.username, id: user._id}, global.jwtKey, {
            algorithm: "HS256",
            expiresIn: global.jwtExpires
        });
        res.set('Authorization', `Bearer ${token}`);
        res.status(204).json(null);
    } catch (error) {
        next(error);
    }
});

app.post('/users', async (req, res, next) => {
    try {
        let {username, email, password} = req.body;
        password = await bcrypt.hash(password, 10);
        let createdAt = new Date();
        let updatedAt = createdAt;
        let user = await UserModel.create({username, password, email, createdAt, updatedAt});
        let token = jwt.sign({username, id: user._id}, global.jwtKey, {
            algorithm: "HS256",
            expiresIn: global.jwtExpires
        });
        res.set('Authorization', `Bearer ${token}`);
        res.status(201).json(user);
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
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});


app.put('/users/:id', async (req, res, next) => {
    try {
        let {id} = req.params;
        let user = await UserModel.findByIdAndUpdate(id, {...req.body, updatedAt: new Date()}, {new: true});
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

app.delete('/users/:id', async (req, res, next) => {
    try {
        let {id} = req.params;
        let user = await UserModel.findByIdAndDelete(id);
        res.status(204).json(null);
    } catch (error) {
        next(error);
    }
});


app.use((err, req, res, next) => {
    let error = {};
    error.status = err.status || 500;
    error.message = err.message || 'Internal server error';
    res.json(error);
});


app.listen(5000);