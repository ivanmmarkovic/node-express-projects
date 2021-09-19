const mongoose = require('mongoose');

const ArticleModel = new mongoose.Schema({
    title: {
        unique: true,
        required: true,
        type: String
    },
    body: {
        required: true,
        type: String
    }
});

