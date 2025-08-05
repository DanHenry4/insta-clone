const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  targetId: { type: mongoose.Schema.Types.ObjectId, required: true }, // post or comment
  targetType: { type: String, enum: ['post', 'comment'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('Like', LikeSchema);
