const express = require('express');
const app = express();

app.use(express.static('public'));

// const mongoose = require('mongoose');
// mongoose.connect('mongodb://admin:password@localhost:27017/articles?authSource=admin', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true 
// });


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const ejs = require('ejs');

app.set('view engine', 'ejs');

app.get('/', async (req, res, next) => {
    res.render('index', {title: 'Index'});
});

app.use('*', async (req, res) => res.render('404', {'title': '404'}));

app.listen(5000, () => console.log('Listen on port 5000'));