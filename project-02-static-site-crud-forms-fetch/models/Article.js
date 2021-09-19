const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
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


const ArticleModel = mongoose.model('ArticleModel', ArticleSchema);

module.exports = ArticleModel;

