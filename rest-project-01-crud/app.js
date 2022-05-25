const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:password@localhost:27017/articles?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

const ArticleModel = require('./models/Article');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.post('/articles', async (req, res, next) => {
    let {title, body} = req.body;
    let article = await ArticleModel.create({title, body});
    res.status(201);
    res.json({
        article
    });
});

app.get("/articles", async (req, res, next) => {
    let articles = await ArticleModel.find();
    res.json({
        articles
    })
});

app.listen(5000);

