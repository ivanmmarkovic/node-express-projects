
const router = require('express').Router();
const bcrypt = require('bcrypt');
const UserModel = require('../models/User');

router.put('/:id', async (req, res, next) => {
    if(req.body.userId == req.params.id || req.body.isAdmin){
        if(req.body.password){
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (error) {
                return res.status(500).json(err);
            }
            try {
                const user = await UserModel.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                });
                return res.status(200).json('Account has been updated');
            } catch (error) {
                return res.status(500).json(err);
            }
        }
    }
    else{
        return res.status(403).json('You can update only your account');
    }
});

router.delete('/:id', async (req, res, next) => {
    if(req.body.userId == req.params.id || req.body.isAdmin){
        try {
            await UserModel.findByIdAndDelete(req.params.id);
            return res.status(204).json('Account has been updated');
        } catch (error) {
            return res.status(500).json(err);
        }
    }
    else{
        return res.status(403).json('You can update only your account');
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.params.id);
        const {password, updatedAt, ...other} = user._doc;
        return res.status(200).json(other);
    } catch (error) {
        return res.status(500).json(err);
    }
});

router.put('/:id/follow', async (req, res, next) => {
    if(req.body.userId !== req.params.id){
        try {
            const user = await UserModel.findById(req.params.id);
            const currentUser = await UserModel.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push: {followers: req.body.userId}});
                await currentUser.updateOne({$push: {followings: req.params.id}});
                return res.status(200).json('User has been followed');
            }
            else {
                return res.status(403).json("You already follow this user")
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    else{
        return res.status(403).json("You can't follow yourself")
    }
});


router.put('/:id/unfollow', async (req, res, next) => {
    if(req.body.userId !== req.params.id){
        try {
            const user = await UserModel.findById(req.params.id);
            const currentUser = await UserModel.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull: {followers: req.body.userId}});
                await currentUser.updateOne({$pull: {followings: req.params.id}});
                return res.status(200).json('User has been unfollowed');
            }
            else {
                return res.status(403).json("You don't follow this user");
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    else{
        return res.status(403).json("You can't unfollow yourself")
    }
});

module.exports = router;