const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
// You should add authentication middleware here in a real app

router.put('/profile', userController.updateProfile);
router.delete('/delete', userController.deleteAccount);

module.exports = router;
