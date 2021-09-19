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
        res.render('index', {title: 'Home | Articles', articles});
    } catch (error) {
        res.render('error');
    }
});

app.get('/create', async (req, res, next) => {
    try {
        res.render('create', {title: 'Create article'});
    } catch (error) {
        res.render('error');
    }
});

app.post('/create', async (req, res, next) => {
    try {
        let articles = ArticleModel.create({...req.body});
		res.redirect('/');
    } catch (error) {
        res.render('error');
    }
});


app.get('/delete/:id', async (req, res, next) => {
    try {
		let id = req.params.id;
        let articles = await ArticleModel.findByIdAndDelete(id);
		res.redirect('/');
    } catch (error) {
        res.render('error');
    }
});

app.get('/update/:id', async (req, res, next) => {
    try {
		let id = req.params.id;
        let article = await ArticleModel.findById(id);
		res.render('update', {title: 'Update article', article});
    } catch (error) {
        res.render('error');
    }
});

app.listen(5000, () => console.log('Listen on port 5000'));