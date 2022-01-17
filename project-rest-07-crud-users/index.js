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

});

app.get('/users', async (req, res, next) => {

});

app.get('/users/:id', async (req, res, next) => {

});

app.patch('/users/:id', async (req, res, next) => {

});

app.delete('/users/:id', async (req, res, next) => {
    
});

app.listen(5000, () => console.log('Listen on port 5000'));