const ArticleModel = require('../models/Article');

const create = async (req, res, next) => {
    try {
        let {title, body} = req.body;
        let article = await ArticleModel.create({
            title, body, 
            createdAt: new Date()
        });
        return res.status(201).json(article);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

const findAll =  async (req, res, next) => {
    try {
        let articles = await ArticleModel.find();
        return res.status(200).json(articles);
    } catch (error) {
        next(error);
    }
};

const findOne = async (req, res, next) => {
    try {
        let {id} = req.params;
        let article = await ArticleModel.findById(id).populate("comments");
        if(article == null){
            return res.status(404).json({message: 'Not found'});
        }
        return res.status(200).json(article);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const update = async (req, res, next) => {
    try {
        let {id} = req.params;
        let article = await ArticleModel.findByIdAndUpdate(id, {...req.body}, {new: true});
        if(article == null){
            return res.status(404).json({message: 'Not found'});
        }
        return res.status(200).json(article);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const deleteArticle = async (req, res, next) => {
    try {
        let {id} = req.params;
        //await ArticleModel.deleteOne({"_id": id});
        await ArticleModel.findByIdAndDelete(id); // same as code above
        return res.status(204).json(null);
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports = {
    create,
    findOne,
    findAll,
    update,
    deleteArticle
};

