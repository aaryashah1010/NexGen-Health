const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const PatientProfile = sequelize.define('PatientProfile', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: true,
      isPast(value) {
        if (new Date(value) >= new Date()) {
          throw new Error('Date of birth must be in the past');
        }
      }
    }
  },
  bloodGroup: {
    type: DataTypes.ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
    allowNull: false
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other'),
    allowNull: false
  },
  emergencyContact: {
    type: DataTypes.JSONB,
    allowNull: false,
    validate: {
      isValidEmergencyContact(value) {
        if (!value.name || !value.phone || !value.relationship) {
          throw new Error('Emergency contact must have name, phone, and relationship');
        }
      }
    }
  },
  medicalHistory: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  height: {
    type: DataTypes.DECIMAL(5, 2), // cm, e.g., 175.50
    allowNull: true,
    validate: {
      min: 50,
      max: 250
    }
  },
  weight: {
    type: DataTypes.DECIMAL(5, 2), // kg, e.g., 70.50
    allowNull: true,
    validate: {
      min: 10,
      max: 300
    }
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  occupation: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'patient_profiles',
  timestamps: true,
  underscored: true
});

// Define the relationship
PatientProfile.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
  onDelete: 'CASCADE'
});

User.hasOne(PatientProfile, {
  foreignKey: 'userId',
  as: 'patientProfile'
});



module.exports = PatientProfile;
