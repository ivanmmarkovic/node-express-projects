const ArticleModel = require('../models/Article');
const CommentModel = require('../models/Comment');

const create = async (req, res, next) => {
    try {
        let {id} = req.params;
        let {body} = req.body;
        let comment = await CommentModel.create({body, article: id, createdAt: new Date().toDateString()})
        let article = await ArticleModel.findById(id);
        await ArticleModel.findByIdAndUpdate(id, {comments: [...article.comments, comment._id]});
        res.status(201).json(comment);
    } catch (error) {
        next(err);
    }
};

const findOne = async (req, res, next) => {
    try {
        let {commentId} = req.params;
        let comment = await CommentModel.findById(commentId).populate("article");
        res.status(200).json(comment);
    } catch (error) {
        next(err);
    }
};

const update = async (req, res, next) => {
    try {
        let {id, commentId} = req.params;
        let {body} = req.body;
        let comment = await CommentModel.findByIdAndUpdate(commentId, {body}, {new: true});
        res.status(200).json(comment);
    } catch (error) {
        next(err);
    }
};

const deleteComment = async (req, res, next) => {
    try{
        let {id, commentId} = req.params;
        let article = await ArticleModel.findById(id);
        let {comments} = article;
        comments = comments.filter(comment => comment != commentId);
        await ArticleModel.findByIdAndUpdate(id, {comments});
        await CommentModel.findOneAndDelete(commentId);
        res.status(204).json(null);
    }catch(error){
        next(error);
    }

};

module.exports = {
    create, 
    findOne,
    update,
    deleteComment
};