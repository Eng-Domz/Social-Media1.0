const Post = require('../Models/post.model');
exports.createPost = async (req, res,next) => {
    try{
        const {userid, title, body, date, likes, comments, liked, imgUrl} = req.body;
        const post = await Post.create({userid, title, body, date, likes, comments, liked, imgUrl});
        res.status(201).json({message: 'Post created successfully', post});
    }catch(error){
        next(error);
    }
}
exports.getPosts = async (req, res,next) => {
    try{
        const posts = await Post.find();
        res.status(200).json({posts});
    }catch(error){
        next(error);
    }
}
exports.getPostById = async (req, res,next) => {
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json({post});
    }catch(error){
        next(error);
    }
}
exports.deletePost = async (req, res,next) => {
    try{
        const post = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({message: 'Post deleted successfully'});
    }catch(error){
        next(error);
    }
}
exports.addLike = async (req, res,next) => {
    try{
        const post = await Post.findByIdAndUpdate(req.params.id, {$inc: {likes: 1}});
        res.status(200).json({message: 'Like added successfully'});
    }catch(error){
        next(error);
    }
}
exports.getLikes = async (req, res,next) => {
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json({likes: post.likes});
    }catch(error){
        next(error);
    }
}
exports.removeLike = async (req, res,next) => {
    try{
        const post = await Post.findByIdAndUpdate(req.params.id, {$inc: {likes: -1}});
        res.status(200).json({message: 'Like removed successfully'});
    }catch(error){
        next(error);
    }
}
exports.addComment = async (req, res,next) => {
    try{
        const post = await Post.findByIdAndUpdate(req.params.id, {$push: {comments: req.body}});
        res.status(200).json({message: 'Comment added successfully'});
    }catch(error){
        next(error);
    }
}
exports.getComments = async (req, res,next) => {
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json({comments: post.comments});
    }catch(error){
        next(error);
    }
}
