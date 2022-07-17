const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

const ejs = require('ejs');
app.set('view engine', 'ejs');

app.use(express.static('public'));


app.get('/', async (req, res, next) => {
    res.render('index', {title: 'Home'});
});


app.listen(PORT, () => console.log(`Server listen on port ${PORT}`));