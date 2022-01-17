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

app.get('/users', async (req, res, next) => {
    
});

app.listen(5000, () => console.log('Listen on port 5000'));