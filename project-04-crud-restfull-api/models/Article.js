const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({

    title: {
        type: String,
        unique: true,
        required: true
    },
    body: {
        type: String,
        required: true
    }
});


const ArticleModel = mongoose.model('ArticleModel', ArticleSchema);

module.exports = ArticleModel;