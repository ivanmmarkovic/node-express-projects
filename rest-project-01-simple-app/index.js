const express = require('express');
const app = express();


app.get('/', (req, res, next) => {
    res.json('Hello world');
});


app.listen(5000, () => console.log('Listen on port 5000'));