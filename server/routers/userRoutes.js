const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/register', authControllers.registerUser);
router.post('/login', authControllers.authUser);
router.get('/profile', protect, authControllers.getUserProfile);
router.put('/profile', protect, authControllers.updateUserProfile);

module.exports = router;
