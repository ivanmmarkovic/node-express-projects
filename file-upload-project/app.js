const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');

const PORT = process.env.PORT || 5000;

const ejs = require('ejs');
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(fileUpload());

app.get('/', async (req, res, next) => {
    res.render('index', {title: 'Home'});
});

app.post('/upload', async (req, res, next) => {
    console.log(req.files);
});


app.listen(PORT, () => console.log(`Server listen on port ${PORT}`));