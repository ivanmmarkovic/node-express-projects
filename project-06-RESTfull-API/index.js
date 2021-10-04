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
    try {
        let article = await ArticleModel.create({...req.body});
        res.json({
            article
        });
    } catch (error) {
        next(error);
    }
});

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

app.get('/articles/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let article = await ArticleModel.findById(id);
        res.json({
            article
        })
    } catch (error) {
        next(err);
    }
});

app.put('/articles/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let article = await ArticleModel.findByIdAndUpdate(id, {...req.body});
        article = {...article, ...req.body}; // check this solution
        res.json({
            article
        })
    } catch (error) {
        next(error);
    }
});


app.delete('/articles/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        await ArticleModel.findByIdAndDelete(id);
        res.status(204).json({
            "article": null
        });
    } catch (error) {
        next(error);
    }
});


app.listen(5000, () => console.log('Listening on port 5000'));