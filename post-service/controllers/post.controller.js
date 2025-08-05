const Post = require('../models/post.model');

exports.createPost = async (req, res) => {
  const { userId, caption, imageUrl } = req.body;
  const post = await Post.create({ userId, caption, imageUrl });
  // TODO: Publish post_created event to RabbitMQ
  res.status(201).json(post);
};

exports.getPosts = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
};
