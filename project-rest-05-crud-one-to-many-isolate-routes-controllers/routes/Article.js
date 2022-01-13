const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/ArticleController');

router. 
    route("/articles")
        .post(ArticleController.create)
        .get(ArticleController.findAll);

router.
    route("/articles/:id")
        .patch(ArticleController.update)
        .get(ArticleController.findOne)
        .delete(ArticleController.deleteArticle);


module.exports = router;

