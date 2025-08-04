// Import all models to ensure they are registered with Sequelize
const User = require('./User');
const AdminProfile = require('./AdminProfile');
const PatientProfile = require('./PatientProfile');

// Export all models
module.exports = {
  User,
  AdminProfile,
  PatientProfile
}; 