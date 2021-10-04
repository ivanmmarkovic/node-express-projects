const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://admin:password@localhost:27017/photobook?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});


app.use(express.json());

const UserModel = require('./models/User');

app.post('/users', async (req, res, next) => {
    try {
        let user = await UserModel.create({...req.body});
        res.json({
            user
        })
    } catch (error) {
        next(error);
    }
});

app.get('/users', async (req, res, next) => {
    try {
        let users = await UserModel.find();
        res.json({
            users
        });
    } catch (error) {
        next(error);
    }
});

app.get('/users/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let user = await UserModel.findById(id);
        res.json({
            user
        });
    } catch (error) {
        next(error);
    }
});

app.put('/users/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let user = await UserModel.findByIdAndUpdate(id, {...req.body});
        res.json({
            user
        });
    } catch (error) {
        next(error);
    }
});

app.delete('/users/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let user = await UserModel.findByIdAndDelete(id);
        res.json({
            user: null
        });
    } catch (error) {
        next(error);
    }
});


app.listen(3000, () => console.log('App is listening on port 3000'));