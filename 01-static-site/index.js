const express = require('express');
const app = express();
const ejs = require('ejs');


app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index', {'title': 'Index'});
});

app.get('/about', (req, res) => {
    res.render('about', {'title': 'About'});
});

app.get('/contact', (req, res) => {
    res.render('contact', {'title': 'Contact'});
});

app.listen(5000, () => console.log('Listening on port 5000'));