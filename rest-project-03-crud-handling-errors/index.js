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
        let article = await ArticleModel.create({
            title, body, 
            createdAt: new Date().toDateString()
        });
        return res.status(201).json(article);
    } catch (error) {
        error.status = 400;
        next(error);
    }
});

app.get('/articles', async (req, res, next) => {
    try {
        let articles = await ArticleModel.find();
        return res.status(200).json(articles);
    } catch (error) {
        next(error);
    }
});

app.get('/articles/:id', async (req, res, next) => {
    try {
        let {id} = req.params;
        let article = await ArticleModel.findById(id);
        if(article == null){
            return res.status(404).json({message: 'Not found'});
        }
        return res.status(200).json(article);
    } catch (error) {
        return res.status(500).json(error);
    }
});

app.patch('/articles/:id', async (req, res, next) => {
    try {
        let {id} = req.params;
        let article = await ArticleModel.findByIdAndUpdate(id, {...req.body}, {new: true});
        if(article == null){
            return res.status(404).json({message: 'Not found'});
        }
        return res.status(200).json(article);
    } catch (error) {
        return res.status(500).json(error);
    }
});

app.delete('/articles/:id', async (req, res, next) => {
    try {
        let {id} = req.params;
        //await ArticleModel.deleteOne({"_id": id});
        await ArticleModel.findByIdAndDelete(id); // same as code above
        return res.status(204).json(null);
    } catch (error) {
        return res.status(500).json(error);
    }
});

app.use((err, req, res, next) => {
    let error = {};
    error.status = err.status || 500;
    error.message = err.message || 'Internal server error';
    return res.json(error);
});

app.listen(5000, () => console.log('Listen on port 5000'));