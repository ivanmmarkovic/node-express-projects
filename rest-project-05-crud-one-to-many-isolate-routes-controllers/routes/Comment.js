const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/CommentController');

router. 
    route("/articles/:id/comments")
        .post(CommentController.create);

router.
    route("/articles/:id/comments/:commentId")
        .patch(CommentController.update)
        .get(CommentController.findOne)
        .delete(CommentController.deleteComment);


module.exports = router;

