const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { populate } = require('./models/Article');

mongoose.connect('mongodb://admin:password@localhost:27017/articles?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

const ArticleModel = require('./models/Article');
const CommentModel = require('./models/Comment');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/articles', async (req, res, next) => {
    try {
        let {title, body} = req.body;
        let article = await ArticleModel.create({
            title, body, 
            createdAt: new Date()
        });
        res.status(201).json(article);
    } catch (error) {
        error.status = 400;
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
        if(article == null){
            res.status(404).json({message: 'Not found'});
        }
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json(error);
    }
});

app.patch('/articles/:id', async (req, res, next) => {
    try {
        let {id} = req.params;
        let article = await ArticleModel.findByIdAndUpdate(id, {...req.body}, {new: true});
        if(article == null){
            res.status(404).json({message: 'Not found'});
        }
        res.status(200).json(article);
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


app.post("/articles/:id/comments", async (req, res, next) => {
    try {
        let {id} = req.params;
        let {body} = req.body;
        let comment = await CommentModel.create({body, article: id, createdAt: new Date()})
        let article = await ArticleModel.findById(id);
        await ArticleModel.findByIdAndUpdate(id, {comments: [...article.comments, comment._id]});
        res.status(201).json(comment);
    } catch (error) {
        next(err);
    }
});

app.get("/articles/:id/comments/:commentId", async (req, res, next) => {
    try {
        let {commentId} = req.params;
        let comment = await CommentModel.findById(commentId).populate("article");
        res.status(200).json(comment);
    } catch (error) {
        next(err);
    }
});

app.patch("/articles/:id/comments/:commentId", async (req, res, next) => {
    try {
        let {id, commentId} = req.params;
        let {body} = req.body;
        let comment = await CommentModel.findByIdAndUpdate(commentId, {body}, {new: true});
        res.status(200).json(comment);
    } catch (error) {
        next(err);
    }
});

app.delete("/articles/:id/comments/:commentId", async (req, res, next) => {
    try{
        let {id, commentId} = req.params;
        let article = await ArticleModel.findById(id);
        let {comments} = article;
        comments = comments.filter(comment => comment != commentId);
        await ArticleModel.findByIdAndUpdate(id, {comments});
        await CommentModel.findOneAndDelete(commentId);
        res.status(204).json(null);
    }catch(error){
        next(error);
    }

});

app.use((err, req, res, next) => {
    let error = {};
    error.status = err.status || 500;
    error.message = err.message || 'Internal server error';
    res.json(error);
});

app.listen(5000, () => console.log('Listen on port 5000'));