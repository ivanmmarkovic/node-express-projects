const express = require('express');
const app = express();


app.get('/', (req, res, next) => {
    res.json('hello');
});



app.listen(5000, () => console.log('App listen on port 5000'));