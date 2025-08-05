const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

router.post('/', authMiddleware, upload.single('image'), postController.createPost);
router.get('/', postController.getPosts);
router.get('/user/:userId', postController.getPostsByUser);
router.delete('/:id', authMiddleware, postController.deletePost);

module.exports = router;
