const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postController');

router.route('/')
  .get(getPosts)
  .post(auth, createPost);

router.route('/:id')
  .get(getPostById)
  .put(auth, updatePost)
  .delete(auth, deletePost);

module.exports = router;
