const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

const fileUpload = require('express-fileupload');
const path = require('path');



app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/upload', fileUpload({
    createParentPath: true
}), (req, res) => {
    const files = req.files;
    console.log(files);

    return res.json({
        status: 'logged',
        message: 'logged'
    })
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));