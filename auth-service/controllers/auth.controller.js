const User = require('../models/user.model');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');
const { publishToQueue } = require('../utils/rabbitmq');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  const existing = await User.findOne({ $or: [{ email }, { username }] });
  if (existing) return res.status(409).json({ message: 'User exists' });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashed });

  // Publish user_registered event
  await publishToQueue('user_registered', {
    id: user._id,
    username: user.username,
    email: user.email,
    registeredAt: new Date().toISOString(),
  });

  res.status(201).json({ id: user._id, email: user.email });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: 'Invalid credentials' });

  const token = generateToken(user._id);

  // Publish user_logged_in event
  await publishToQueue('user_logged_in', {
    id: user._id,
    email: user.email,
    loggedInAt: new Date().toISOString(),
  });

  res.json({ token });
};

exports.logout = async (req, res) => {
  // For stateless JWT, logout is usually handled on the client, but we can still emit an event
  const user = req.user;
  if (user) {
    await publishToQueue('user_logged_out', {
      id: user._id,
      email: user.email,
      loggedOutAt: new Date().toISOString(),
    });
  }
  res.status(200).json({ message: 'Logged out' });
};

exports.changePassword = async (req, res) => {
  const userId = req.user._id;
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(userId);
  if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
    await publishToQueue('user_login_failed', {
      id: userId,
      email: user.email,
      reason: 'Incorrect old password for password change',
      attemptedAt: new Date().toISOString(),
    });
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  await publishToQueue('user_password_changed', {
    id: user._id,
    email: user.email,
    changedAt: new Date().toISOString(),
  });
  res.status(200).json({ message: 'Password changed' });
};

exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });
  // Here you would generate a token and send email (omitted for brevity)
  await publishToQueue('user_password_reset_requested', {
    id: user._id,
    email: user.email,
    requestedAt: new Date().toISOString(),
  });
  res.status(200).json({ message: 'Password reset requested' });
};

exports.completePasswordReset = async (req, res) => {
  const { email, newPassword } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  await publishToQueue('user_password_reset_completed', {
    id: user._id,
    email: user.email,
    completedAt: new Date().toISOString(),
  });
  res.status(200).json({ message: 'Password reset completed' });
};

exports.loginFailed = async (req, res) => {
  const { email } = req.body;
  await publishToQueue('user_login_failed', {
    email,
    attemptedAt: new Date().toISOString(),
  });
  res.status(401).json({ message: 'Invalid credentials' });
};

exports.lockAccount = async (req, res) => {
  const userId = req.user._id;
  // Here you would set a locked flag in the user model (not implemented)
  await publishToQueue('user_locked', {
    id: userId,
    lockedAt: new Date().toISOString(),
  });
  res.status(200).json({ message: 'Account locked' });
};

exports.verifyEmail = async (req, res) => {
  const userId = req.user._id;
  // Here you would set an emailVerified flag (not implemented)
  await publishToQueue('user_email_verified', {
    id: userId,
    verifiedAt: new Date().toISOString(),
  });
  res.status(200).json({ message: 'Email verified' });
};

exports.enable2FA = async (req, res) => {
  const userId = req.user._id;
  // Here you would enable 2FA (not implemented)
  await publishToQueue('user_2fa_enabled', {
    id: userId,
    enabledAt: new Date().toISOString(),
  });
  res.status(200).json({ message: '2FA enabled' });
};

exports.disable2FA = async (req, res) => {
  const userId = req.user._id;
  // Here you would disable 2FA (not implemented)
  await publishToQueue('user_2fa_disabled', {
    id: userId,
    disabledAt: new Date().toISOString(),
  });
  res.status(200).json({ message: '2FA disabled' });
};
