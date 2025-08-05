const User = require('../models/user.model');

exports.updateProfile = async (req, res) => {
  const userId = req.user._id;
  const { username, email } = req.body;
  const user = await User.findByIdAndUpdate(userId, { username, email }, { new: true });
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.status(200).json({ message: 'Profile updated', user });
};

exports.deleteAccount = async (req, res) => {
  const userId = req.user._id;
  const user = await User.findByIdAndDelete(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.status(200).json({ message: 'Account deleted' });
};
