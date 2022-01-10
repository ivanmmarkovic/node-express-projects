const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date
    }
});


const ArticleModel = mongoose.model('ArticleModel', ArticleSchema);

module.exports = ArticleModel;