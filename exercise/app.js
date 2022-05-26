const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:password@localhost:27017/articles?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(5000);