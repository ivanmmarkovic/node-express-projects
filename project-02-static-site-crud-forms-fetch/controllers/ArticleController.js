const ArticleModel = require('../models/Article');


const articlesGet = (req, res, next) => {
    try {
        let articles = await ArticleModel.find();
        res.render('index', {title: 'Index', articles});
    } catch (error) {
        res.render('error');
    }
}