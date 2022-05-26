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
        let {title, body} = req.body;
        let article = await ArticleModel.create({title, body});
        res.status(201);
        res.json({
            article
        });
    } catch (error) {
        res.status(500).json(error);
    }
});


app.get("/articles", async (req, res, next) => {
    try {
        let articles = await ArticleModel.find();
        res.json({
            articles
        });
    } catch (error) {
        res.status(500).json(error);
    }
});


app.get("/articles/:id", async (req, res, next) => {
    try {
        let {id} = req.params;
        let article = await ArticleModel.findById(id);
        res.json({
            article
        });
    } catch (error) {
        res.status(500).json(error);
    }
});


app.patch("/articles/:id", async (req, res, next) => {
    try {
        let {id} = req.params;
        let article = await ArticleModel.findByIdAndUpdate(id, {...req.body}, {new: true});
        res.json({
            article
        });
    } catch (error) {
        res.status(500).json(error);
    }
});


app.delete('/articles/:id', async (req, res, next) => {
    try {
        let {id} = req.params;
        //await ArticleModel.deleteOne({"_id": id});
        await ArticleModel.findByIdAndDelete(id); // same as code above
        res.status(204).json(null);
        
    } catch (error) {
        res.status(500).json(error);
    }
});

app.listen(5000);
