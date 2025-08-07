const { AdminProfile, User } = require('../models');

const createOrUpdateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      hospitalName,
      city,
      location,
      address,
      contactPerson,
      hospitalType,
      totalBeds,
      available,
      verificationDocuments
    } = req.body;

    if (!hospitalName || !city || !location || !address || !contactPerson || !totalBeds) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    if (!location.latitude || !location.longitude ||
        location.latitude < -90 || location.latitude > 90 ||
        location.longitude < -180 || location.longitude > 180) {
      return res.status(400).json({ message: 'Invalid latitude/longitude' });
    }

    const validHospitalTypes = ['general', 'specialty', 'multi_specialty', 'super_specialty', 'teaching', 'research'];
    if (hospitalType && !validHospitalTypes.includes(hospitalType)) {
      return res.status(400).json({ message: 'Invalid hospital type' });
    }

    if (totalBeds < 1 || totalBeds > 10000) {
      return res.status(400).json({ message: 'Total beds must be between 1 and 10000' });
    }

    if (available !== undefined && (available < 0 || available > totalBeds)) {
      return res.status(400).json({ message: 'Invalid available beds' });
    }

    const user = await User.findByPk(userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can create admin profiles' });
    }

    let adminProfile = await AdminProfile.findOne({ where: { userId } });

    if (adminProfile) {
      await adminProfile.update({
        hospitalName, city, location, address, contactPerson,
        hospitalType: hospitalType || 'general',
        totalBeds,
        available: available !== undefined ? available : adminProfile.availableBeds,
        verificationDocuments
      });

      return res.status(200).json({ message: 'Profile updated', profile: adminProfile });
    } else {
      adminProfile = await AdminProfile.create({
        userId, hospitalName, city, location, address, contactPerson,
        hospitalType: hospitalType || 'general',
        totalBeds,
        available: available || 0,
        verificationDocuments
      });

      return res.status(201).json({ message: 'Profile created', profile: adminProfile });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const getAdminProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const adminProfile = await AdminProfile.findOne({
      where: { userId },
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'email', 'firstName', 'lastName', 'role']
      }]
    });

    if (!adminProfile) {
      return res.status(404).json({ message: 'Admin profile not found' });
    }

    return res.status(200).json({ message: 'Profile retrieved', profile: adminProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


module.exports = {
  createOrUpdateProfile,
  getAdminProfile,
  getAllHospitals
};