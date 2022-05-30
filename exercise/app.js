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


app.use((err, req, res, next) => {
    let error = {};
    error.status = err.status || 500;
    error.message = err.message || 'Internal server error';
    res.json(error);
});

app.listen(5000);