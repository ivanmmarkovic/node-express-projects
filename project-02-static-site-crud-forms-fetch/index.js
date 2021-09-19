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

const ejs = require('ejs');

app.set('view engine', 'ejs');


app.get('/', async (req, res, next) => {
    try {
        let articles = await ArticleModel.find();
        res.render('index', {title: 'Index', articles});
    } catch (error) {
        res.render('error');
    }
});


app.listen(5000, () => console.log('Listen on port 5000'));