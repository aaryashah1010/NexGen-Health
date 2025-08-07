const express = require('express');
const { createOrUpdateProfile, getAdminProfile, getAllHospitals } = require('../controllers/adminController');
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
router.get('/hospitals', getAllHospitals);

module.exports = router;
