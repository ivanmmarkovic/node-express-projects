const express = require('express');
const dotenv = require('dotenv');
const ejs = require('ejs');

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res, next) => {
    res.render('index');
});



app.listen(PORT, () => console.log(`App listen on port ${PORT}`));