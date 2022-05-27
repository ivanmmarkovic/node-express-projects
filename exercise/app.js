const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ArticleModel = require('./models/Article');
const CommentModel = require('./models/Comment');

mongoose.connect('mongodb://admin:password@localhost:27017/articles?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.post('/articles', async (req, res, next) => {
    try {
        let {title, body} = req.body;
        let article = await ArticleModel.create({title, body, createdAt: new Date()});
        res.status(201).json(article);
    } catch (error) {
        next(error);
    }
});

app.get('/articles', async (req, res, next) => {
    try {
        let articles = await ArticleModel.find();
        res.status(200).json(articles);
    } catch (error) {
        next(error);
    }
});

app.get('/articles/:id', async (req, res, next) => {
    try {
        let {id} = req.params;
        let article = await ArticleModel.findById(id).populate("comments");
        res.status(200).json(article);
    } catch (error) {
        next(error);
    }
});


app.patch('/articles/:id', async (req, res, next) => {
    try {
        let {id} = req.params;
        let article = await ArticleModel.findByIdAndUpdate(id, {...req.body}, {new: true});
        res.status(200).json(article);
    } catch (error) {
        next(error);
    }
});

app.delete('/articles/:id', async (req, res, next) => {
    try {
        let {id} = req.params;
        await ArticleModel.findByIdAndDelete(id);
        res.status(201).json(null);
    } catch (error) {
        next(error);
    }
});

app.post("/articles/:id/comments", async (req, res, next) => {
    try {
        let {id} = req.params;
        let {body} = req.body;
        let comment = await CommentModel.create({body, createdAt: new Date(), article: id});
        let article = await ArticleModel.findById(id);
        await ArticleModel.findByIdAndUpdate(id, {comments: [...article.comments, comment._id]});
        res.status(201).json(comment);
    } catch (error) {
        next(error);
    }
});

app.get("/articles/:id/comments/:commentId", async (req, res, next) => {
    try {
        let {commentId} = req.params;
        let comment = await CommentModel.findById(commentId);
        res.status(200).json(comment);
    } catch (error) {
        next(error);
    }
});

app.patch("/articles/:id/comments/:commentId", async (req, res, next) => {
    try {
        let {commentId} = req.params;
        let comment = await CommentModel.findByIdAndUpdate(commentId, {...req.body}, {new: true});
        res.status(200).json(comment);
    } catch (error) {
        next(error);
    }
});

app.delete("/articles/:id/comments/:commentId", async (req, res, next) => {
    try {
        let {id, commentId} = req.params;
        let article = await ArticleModel.findById(id);
        let {comments} = article;
        comments = comments.filter(cid => cid != commentId);
        await ArticleModel.findByIdAndUpdate(id, {comments});
        await CommentModel.findByIdAndDelete(commentId);
        res.status(200).json(null);
    } catch (error) {
        next(error);
    }
});

app.use((err, req, res, next) => {
    let error = {};
    error.status = err.status || 500;
    error.message = err.message || 'Internal server error';
    res.json(error);
});

app.listen(5000);