
const express = require('express');
const app = express();

const ejs = require('ejs');

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', async (req, res, next) => {
    res.render('index');
});


app.listen(3000);