const express = require('express');
const app = express();

const ejs = require('ejs');

const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs');


app.get('/', async (req, res, next) => {
    res.render('index', {title: 'Home'});
});


app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));