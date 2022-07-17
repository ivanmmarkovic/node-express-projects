const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

const fileUpload = require('express-fileupload');
const path = require('path');

const filesPayloadExists = require('./middlewares/filesPayloadExists');
const fileExtLimiter = require('./middlewares/fileExtLimiter');
const fileSizeLimiter = require('./middlewares/fileSizeLimiter');



app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/upload', 
    fileUpload({createParentPath: true}), 
    filesPayloadExists,
    fileExtLimiter(['.png', '.jpg', '.jpeg']), // returns a function, and that function is a middleware
    fileSizeLimiter,
    (req, res) => {
        const files = req.files;
        console.log(files);

        return res.json({
            status: 'logged',
            message: 'logged'
        })
    });


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));