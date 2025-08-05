const Like = require('../models/like.model');
const { publishToQueue } = require('../utils/rabbitmq');

exports.like = async (req, res) => {
  const { targetId, targetType } = req.body;
  const userId = req.user?._id || req.body.userId;
  if (!userId || !targetId || !['post', 'comment'].includes(targetType)) {
    return res.status(400).json({ message: 'userId, targetId, and valid targetType are required' });
  }
  // Prevent duplicate likes
  const existing = await Like.findOne({ userId, targetId, targetType });
  if (existing) return res.status(409).json({ message: 'Already liked' });
  const like = await Like.create({ userId, targetId, targetType });
  await publishToQueue('like_created', {
    id: like._id,
    userId: like.userId,
    targetId: like.targetId,
    targetType: like.targetType,
    createdAt: like.createdAt,
  });
  res.status(201).json(like);
};

exports.unlike = async (req, res) => {
  const { targetId, targetType } = req.body;
  const userId = req.user?._id || req.body.userId;
  const like = await Like.findOne({ userId, targetId, targetType });
  if (!like) return res.status(404).json({ message: 'Like not found' });
  await like.deleteOne();
  await publishToQueue('like_deleted', {
    id: like._id,
    userId: like.userId,
    targetId: like.targetId,
    targetType: like.targetType,
    deletedAt: new Date().toISOString(),
  });
  res.status(200).json({ message: 'Unliked' });
};

exports.getLikes = async (req, res) => {
  const { targetId, targetType } = req.query;
  if (!targetId || !['post', 'comment'].includes(targetType)) {
    return res.status(400).json({ message: 'targetId and valid targetType are required' });
  }
  const likes = await Like.find({ targetId, targetType });
  res.json(likes);
};
