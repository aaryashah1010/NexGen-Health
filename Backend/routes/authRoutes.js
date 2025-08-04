const express = require('express');
const { register, login, getCurrentUser } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

// Protected route - requires JWT token
router.get('/me', protect, getCurrentUser);

module.exports = router;