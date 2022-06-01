const express = require('express');
const app = express();
const mongoose = require('mongoose');


mongoose.connect('mongodb://admin:password@localhost:27017/articles?authSource=admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

const ArticleRouter = require('./routes/Article');
const CommentRouter = require('./routes/Comment');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", ArticleRouter);
app.use("/", CommentRouter);

app.use((err, req, res, next) => {
    let error = {};
    error.status = err.status || 500;
    error.message = err.message || 'Internal server error';
    return res.json(error);
});

app.listen(5000, () => console.log('Listen on port 5000'));