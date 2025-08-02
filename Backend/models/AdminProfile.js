const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const AdminProfile = sequelize.define('AdminProfile', {
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
  hospitalName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: [1, 100]
    }
  },
  city: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      len: [1, 50]
    }
  },
  location: {
    type: DataTypes.JSONB,
    allowNull: false,
    validate: {
      isValidLocation(value) {
        if (!value.latitude || !value.longitude) {
          throw new Error('Location must have latitude and longitude');
        }
        if (value.latitude < -90 || value.latitude > 90) {
          throw new Error('Latitude must be between -90 and 90');
        }
        if (value.longitude < -180 || value.longitude > 180) {
          throw new Error('Longitude must be between -180 and 180');
        }
      }
    }
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  contactPerson: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: [1, 100]
    }
  },
  hospitalType: {
    type: DataTypes.ENUM('general', 'specialty', 'multi_specialty', 'super_specialty', 'teaching', 'research'),
    allowNull: false,
    defaultValue: 'general'
  },
  totalBeds: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10000
    }
  },
  available: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0,
      max: function() {
        return this.totalBeds;
      }
    }
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  verificationDocuments: {
    type: DataTypes.JSONB,
    allowNull: true,
    validate: {
      isValidDocuments(value) {
        if (value && !Array.isArray(value)) {
          throw new Error('Verification documents must be an array');
        }
      }
    }
  }
}, {
  tableName: 'admin_profiles',
  timestamps: true,
  underscored: true
});

// Define the relationship
AdminProfile.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
  onDelete: 'CASCADE'
});

User.hasOne(AdminProfile, {
  foreignKey: 'userId',
  as: 'adminProfile'
});



module.exports = AdminProfile;
