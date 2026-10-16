const Post = require('../models/Post');

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'name email').sort({ createdAt: -1 });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: 'Server error while fetching posts' });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user', 'name email');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: 'Server error while fetching post' });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Please provide title and content' });
    }

    const newPost = await Post.create({
      title,
      content,
      user: req.user._id,
      author: req.user.name,
    });

    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ message: 'Server error while creating post' });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this post' });
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(500).json({ message: 'Server error while updating post' });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this post' });
    }

    await post.deleteOne();

    return res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error while deleting post' });
  }
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
