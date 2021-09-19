const express = require('express');
const app = express();

const mongoose = require('mongoose');
const ArticleModel = require('./models/Article');

const ejs = require('ejs');

app.set('view engine', 'ejs');


app.get('/', async (req, res, next) => {
	res.render('index', {title: 'Index'});
});


app.listen(5000, () => console.log('Listen on port 5000'));