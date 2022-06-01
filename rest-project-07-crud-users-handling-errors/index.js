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
        return res.status(201).json(user);
    } catch (error) {
        next(error);
    }
});

app.get('/users', async (req, res, next) => {
    try {
        let users = await UserModel.find();
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

app.get('/users/:id', async (req, res, next) => {
    try {
        let {id} = req.params;
        let user = await UserModel.findById(id);
        if(user == null){
            return res.status(404).json({message: "Not found"});
        }
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

app.patch('/users/:id', async (req, res, next) => {
    try {
        let {id} = req.params;
        let updatedAt = new Date();
        let user = await UserModel.findByIdAndUpdate(id, {...req.body, updatedAt}, {new: true});
        if(user == null){
            return res.status(404).json({message: "Not found"});
        }
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

app.delete('/users/:id', async (req, res, next) => {
    try {
        let {id} = req.params;
        await UserModel.findByIdAndDelete(id);
        return res.status(204).json(null);
    }catch(error){
        next(error);
    }
});


app.use((err, req, res, next) => {
    let error = {
        message: err.message || "Internal server error",
        status: err.status || 500
    };
    return res.status(err.status).json(error);
});

app.listen(5000, () => console.log('Listen on port 5000'));