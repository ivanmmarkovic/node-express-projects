const express = require('express');
const app = express();
const mongoose = require('mongoose');


mongoose.connect('mongodb://admin:password@localhost:27017/articles?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

const ArticleModel = require('./models/Article');

app.get('/articles', async (req, res, next) => {

    try {
        let articles = await ArticleModel.find();
        res.json({
            articles
        })
    } catch (error) {
        next(err);
    }
});


