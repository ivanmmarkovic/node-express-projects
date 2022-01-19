const express = require('express');
const app = express();
const mongoose = require('mongoose');


mongoose.connect('mongodb://admin:password@localhost:27017/articles?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

const UserModel = require('./models/User');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/users', async (req, res, next) => {
    try {
        let {username, email} = req.body;
        let createdAt = new Date();
        let updatedAt = new Date();
        let user = await UserModel.create({username, email, createdAt, updatedAt});
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

app.patch('/users/:id', async (req, res, next) => {
    try {
        let {id} = req.params;
        let updatedAt = new Date();
        let user = await UserModel.findByIdAndUpdate(id, {...req.body, updatedAt}, {new: true});
        res.status(200).json(user);
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