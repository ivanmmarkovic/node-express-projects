const router = require('express').Router();
const PostModel = require('../models/Post');
const UserModel = require('../models/User');

router.post('/', async (req, res, next) => {
    const newPost = new PostModel(req.body);
    try {
        const savedPost = await newPost.save();
        return res.status(201).json(savedPost);
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const post = await PostModel.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({$set: req.body});
            return res.status(200).json('Post has been updated');
        }
        else{
            return res.status(403).json('You can update only your post');
        }
        
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const post = await PostModel.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne();
            return res.status(200).json('Post has been deleted');
        }
        else{
            return res.status(403).json('You can delete only your post');
        }
        
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.put('/:id/like', async (req, res, next) => {
    try {
        const post = await PostModel.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push: {likes: req.body.userId}});
            return res.status(200).json('Post has been liked');
        }
        else{
            await post.updateOne({$push: {likes: req.body.userId}});
            return res.status(200).json('Post has been disliked');
        }
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const post = await PostModel.findById(req.params.id);
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json(error);
    }
});


router.get('/timeline/all', async (req, res, next) => {
    const postArray = [];
    try {
        const currentUser = await UserModel.findById(req.body.userId);
        const userPosts = await PostModel.find({userId: currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.followings.map(friendId => PostModel.find({userId: friendId}))
        );
        return res.status(200).json(userPosts.concat(...friendPosts));
    } catch (error) {
        return res.status(500).json(error);
    }
});

module.exports = router;