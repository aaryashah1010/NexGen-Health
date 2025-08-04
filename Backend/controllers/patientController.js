const { PatientProfile, User } = require('../models');

// Create or update patient profile
const createOrUpdateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      dateOfBirth,
      bloodGroup,
      gender,
      emergencyContact,
      medicalHistory,
      height,
      weight,
      address,
      occupation
    } = req.body;

    // Validate required fields
    if (!dateOfBirth || !bloodGroup || !gender || !emergencyContact || !address) {
      return res.status(400).json({
        message: 'Missing required fields: dateOfBirth, bloodGroup, gender, emergencyContact, address'
      });
    }

    // Validate emergency contact
    if (!emergencyContact.name || !emergencyContact.phone || !emergencyContact.relationship) {
      return res.status(400).json({
        message: 'Emergency contact must include name, phone, and relationship'
      });
    }

    // Check if user exists and is a patient
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role !== 'patient') {
      return res.status(403).json({ message: 'Only patients can create profiles' });
    }

    // Check if profile already exists
    let patientProfile = await PatientProfile.findOne({ where: { userId } });

    if (patientProfile) {
      // Update existing profile
      await patientProfile.update({
        dateOfBirth,
        bloodGroup,
        gender,
        emergencyContact,
        medicalHistory,
        height,
        weight,
        address,
        occupation
      });
    } else {
      // Create new profile
      patientProfile = await PatientProfile.create({
        userId,
        dateOfBirth,
        bloodGroup,
        gender,
        emergencyContact,
        medicalHistory,
        height,
        weight,
        address,
        occupation
      });
    }

    res.json({
      message: 'Patient profile saved successfully',
      profile: patientProfile
    });

  } catch (error) {
    console.error('Error saving patient profile:', error);
    res.status(500).json({ message: 'Failed to save patient profile', error: error.message });
  }
};

// Get patient profile
const getPatientProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const patientProfile = await PatientProfile.findOne({
      where: { userId },
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'name', 'email', 'phone']
      }]
    });

    if (!patientProfile) {
      return res.status(404).json({ message: 'Patient profile not found' });
    }

    res.json({ profile: patientProfile });

  } catch (error) {
    console.error('Error getting patient profile:', error);
    res.status(500).json({ message: 'Failed to get patient profile', error: error.message });
  }
};

module.exports = {
  createOrUpdateProfile,
  getPatientProfile
}; 