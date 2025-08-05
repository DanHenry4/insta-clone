const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware, postController.createPost);
router.get('/', postController.getPosts);
router.get('/user/:userId', postController.getPostsByUser);
router.delete('/:id', authMiddleware, postController.deletePost);

module.exports = router;
