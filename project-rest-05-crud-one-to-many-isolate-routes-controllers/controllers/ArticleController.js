const ArticleModel = require('../models/Article');

const create = async (req, res, next) => {
    try {
        let {title, body} = req.body;
        let article = await ArticleModel.create({
            title, body, 
            createdAt: new Date().toDateString()
        });
        res.status(201).json(article);
    } catch (error) {
        error.status = 400;
        next(error);
    }
};

const findAll =  async (req, res, next) => {
    try {
        let articles = await ArticleModel.find();
        res.status(200).json(articles);
    } catch (error) {
        next(error);
    }
};

const findOne = async (req, res, next) => {
    try {
        let {id} = req.params;
        let article = await ArticleModel.findById(id).populate("comments");
        if(article == null){
            res.status(404).json({message: 'Not found'});
        }
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json(error);
    }
};

const update = async (req, res, next) => {
    try {
        let {id} = req.params;
        let article = await ArticleModel.findByIdAndUpdate(id, {...req.body}, {new: true});
        if(article == null){
            res.status(404).json({message: 'Not found'});
        }
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteArticle = async (req, res, next) => {
    try {
        let {id} = req.params;
        //await ArticleModel.deleteOne({"_id": id});
        await ArticleModel.findByIdAndDelete(id); // same as code above
        res.status(204).json(null);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    create,
    findOne,
    findAll,
    update,
    deleteArticle
};

