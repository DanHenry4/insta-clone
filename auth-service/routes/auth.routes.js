const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authMiddleware, authController.logout);
router.post('/change-password', authMiddleware, authController.changePassword);
router.post('/password-reset/request', authController.requestPasswordReset);
router.post('/password-reset/complete', authController.completePasswordReset);
router.post('/login-failed', authController.loginFailed);
router.post('/lock', authMiddleware, authController.lockAccount);
router.post('/verify-email', authMiddleware, authController.verifyEmail);
router.post('/2fa/enable', authMiddleware, authController.enable2FA);
router.post('/2fa/disable', authMiddleware, authController.disable2FA);
router.get('/me', authMiddleware, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;