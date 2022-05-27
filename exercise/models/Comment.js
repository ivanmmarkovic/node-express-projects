
const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    body: {
        type:String,
        required: true
    },
    createdAt: {
        type:Date
    },
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ArticleModel"
    }
});


const CommentModel = mongoose.model('CommentModel', CommentSchema);
module.exports = CommentModel;