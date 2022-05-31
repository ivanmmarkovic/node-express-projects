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


app.post('/users', async (req, res, next) => {
    try {
        let {username, email, password} = req.body;
        password = await bcrypt.hash(password, 10);
        let createdAt = new Date();
        let updatedAt = createdAt;
        let user = await UserModel.create({username, password, email, createdAt, updatedAt});
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