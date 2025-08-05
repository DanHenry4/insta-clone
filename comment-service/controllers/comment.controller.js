const Comment = require('../models/comment.model');
const { publishToQueue } = require('../utils/rabbitmq');

exports.createComment = async (req, res) => {
  const { postId, text } = req.body;
  const userId = req.user?._id || req.body.userId;
  if (!userId || !postId || !text) return res.status(400).json({ message: 'userId, postId, and text are required' });
  const comment = await Comment.create({ postId, userId, text });
  await publishToQueue('comment_created', {
    id: comment._id,
    postId: comment.postId,
    userId: comment.userId,
    text: comment.text,
    createdAt: comment.createdAt,
  });
  res.status(201).json(comment);
};

exports.getCommentsByPost = async (req, res) => {
  const { postId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  const comments = await Comment.find({ postId })
    .sort({ createdAt: 1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));
  res.json(comments);
};

exports.deleteComment = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?._id;
  const comment = await Comment.findById(id);
  if (!comment) return res.status(404).json({ message: 'Comment not found' });
  if (String(comment.userId) !== String(userId)) return res.status(403).json({ message: 'Forbidden' });
  await comment.deleteOne();
  await publishToQueue('comment_deleted', {
    id: comment._id,
    postId: comment.postId,
    userId: comment.userId,
    deletedAt: new Date().toISOString(),
  });
  res.status(200).json({ message: 'Comment deleted' });
};
