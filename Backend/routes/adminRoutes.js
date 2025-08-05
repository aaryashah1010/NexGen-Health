const express = require('express');
const { createOrUpdateProfile, getAdminProfile } = require('../controllers/adminController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Test route
router.get('/', (req, res) => {
  res.send('✅ Admin route root working');
});

// Auth-protected routes
router.use(protect);

router.post('/profile', createOrUpdateProfile);
router.get('/profile', getAdminProfile);

module.exports = router;
