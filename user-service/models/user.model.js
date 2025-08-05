const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  // Add more profile fields as needed (bio, avatar, etc.)
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
