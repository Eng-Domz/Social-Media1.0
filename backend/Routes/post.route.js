const express = require('express');
const router = express.Router();
const {createPost, getPosts, getPostById, deletePost, addLike, removeLike , getLikes , addComment, getComments} = require('../Controllers/posts.controller');
const {valid} = require('../MiddleWares/auth.middleware');

router.route('/').post(valid, createPost).get(valid,getPosts);
router.route('/:id').get(valid,getPostById).delete(valid,deletePost);
router.route('/:id/likes').post(valid,addLike).delete(valid,removeLike).get(valid,getLikes);
router.route('/:id/comments').post(valid,addComment).get(valid,getComments);
module.exports = router;