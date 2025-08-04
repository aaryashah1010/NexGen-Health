const express = require('express');
const { createOrUpdateProfile, getPatientProfile } = require('../controllers/patientController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// All routes require authentication
router.use(protect);

// Create or update patient profile
router.post('/profile', createOrUpdateProfile);

// Get patient profile
router.get('/profile', getPatientProfile);

module.exports = router; 