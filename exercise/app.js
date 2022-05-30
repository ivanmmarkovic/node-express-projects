const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/User');

mongoose.connect('mongodb://admin:password@localhost:27017/articles?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.post('/users', async (req, res, next) => {
    let user = await UserModel.create({...req.body, createdAt: new Date()});
    res.status(201).json(user);
});


app.get('/users', async (req, res, next) => {
    let users = await UserModel.find();
    res.status(200).json(users);
});

app.get('/users/:id', async (req, res, next) => {
    let {id} = req.params;
    let user = await UserModel.findById(id);
    res.status(200).json(user);
});


app.put('/users/:id', async (req, res, next) => {
    let {id} = req.params;
    let user = await UserModel.findByIdAndUpdate(id, {...req.body}, {new: true});
    res.status(200).json(user);
});

app.delete('/users/:id', async (req, res, next) => {
    let {id} = req.params;
    let user = await UserModel.findByIdAndDelete(id);
    res.status(204).json(null);
});


app.use((err, req, res, next) => {
    let error = {};
    error.status = err.status || 500;
    error.message = err.message || 'Internal server error';
    res.json(error);
});


app.listen(5000);