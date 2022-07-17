const path = require('path');
const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');

const PORT = process.env.PORT || 5000;

const ejs = require('ejs');
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(fileUpload({createParentPath: true}));

app.get('/', async (req, res, next) => {
    res.render('index', {title: 'Home'});
});

app.post('/upload', async (req, res, next) => {
    // req.files -> Object
    console.log(Object.keys(req.files)); // return array of file(s) name as key
    Object.keys(req.files).forEach(key => {
        const filepath = path.join(__dirname, '/files', req.files[key].name);
        req.files[key].mv(filepath, (err) => {
            if(err){
                return res.status(500).json({
                    status: 'error',
                    message: err
                })
            }
        });
    });

    return res.json({
        status: 'success',
        message: Object.keys(req.files).toString()
    })
});


app.listen(PORT, () => console.log(`Server listen on port ${PORT}`));