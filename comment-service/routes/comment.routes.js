const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware, commentController.createComment);
router.get('/post/:postId', commentController.getCommentsByPost);
router.delete('/:id', authMiddleware, commentController.deleteComment);

module.exports = router;
