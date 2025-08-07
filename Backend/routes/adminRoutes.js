const express = require('express');
const { createOrUpdateProfile, getAdminProfile, getAllHospitals } = require('../controllers/adminController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public route for getting all hospitals (no auth required for patients to view)
router.get('/hospitals', getAllHospitals);

// Test route
router.get('/', (req, res) => {
  res.json({ message: 'Admin routes working!' });
});

// All other routes require authentication
router.use(protect);

// Create or update admin profile
router.post('/profile', createOrUpdateProfile);

// Get admin profile
router.get('/profile', getAdminProfile);

module.exports = router;
