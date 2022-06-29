const express = require('express');
const dotenv = require('dotenv');

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res, next) => {
    res.json('hello');
});



app.listen(5000, () => console.log('App listen on port 5000'));