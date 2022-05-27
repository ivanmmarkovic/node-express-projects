const mongoose = require('mongoose');

const ArticleSchema = mongoose.Schema({
    title: {
        type:String,
        unique: true
    },
    body: {
        type:String,
        required: true
    },
    createdAt: {
        type:Date
    }
});


const ArticleModel = mongoose.model('ArticleModel', ArticleSchema);
module.exports = ArticleModel;