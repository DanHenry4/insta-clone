const Post = require('../models/post.model');
const { publishToQueue } = require('../utils/rabbitmq');
const path = require('path');

exports.createPost = async (req, res) => {
  const { caption } = req.body;
  const userId = req.user._id || req.body.userId; // Prefer authenticated user
  let imageUrl = req.body.imageUrl;
  if (req.file) {
    imageUrl = `/uploads/${req.file.filename}`;
  }
  if (!userId || !imageUrl) return res.status(400).json({ message: 'userId and imageUrl are required' });
  const post = await Post.create({ userId, caption, imageUrl });
  // Publish post_created event to RabbitMQ
  await publishToQueue('post_created', {
    id: post._id,
    userId: post.userId,
    caption: post.caption,
    imageUrl: post.imageUrl,
    createdAt: post.createdAt,
  });
  res.status(201).json(post);
};

exports.getPosts = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));
  res.json(posts);
};

exports.getPostsByUser = async (req, res) => {
  const { userId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const posts = await Post.find({ userId })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));
  res.json(posts);
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?._id;
  const post = await Post.findById(id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  if (String(post.userId) !== String(userId)) return res.status(403).json({ message: 'Forbidden' });
  await post.deleteOne();
  // Publish post_deleted event to RabbitMQ
  await publishToQueue('post_deleted', {
    id: post._id,
    userId: post.userId,
    deletedAt: new Date().toISOString(),
  });
  res.status(200).json({ message: 'Post deleted' });
};
