const express = require('express');
const app = express();
const ejs = require('ejs')


app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    res.render('index', {title: 'Index'});
});

app.get('/about', async (req, res) => {
    res.render('about', {title: 'About'});
});

app.use('*', async (req, res) => res.render('404', {'title': '404'}));

app.listen(5000, () => console.log('Listen on port 5000'));