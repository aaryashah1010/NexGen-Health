const mongoose = require('mongoose');

const patientProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    required: [true, 'Blood group is required']
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: [true, 'Gender is required']
  },
  emergencyContact: {
    name: {
      type: String,
      required: [true, 'Emergency contact name is required'],
      trim: true
    },
    phone: {
      type: String,
      required: [true, 'Emergency contact phone is required'],
      match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
    },
    relationship: {
      type: String,
      required: [true, 'Relationship with emergency contact is required'],
      enum: ['Spouse', 'Parent', 'Child', 'Sibling', 'Friend', 'Other']
    }
  },
  medicalHistory: [{
    condition: {
      type: String,
      required: true,
      trim: true
    },
    diagnosedDate: Date,
    isActive: {
      type: Boolean,
      default: true
    },
    medications: [String],
    notes: String
  }],
  allergies: [{
    allergen: {
      type: String,
      required: true,
      trim: true
    },
    severity: {
      type: String,
      enum: ['Mild', 'Moderate', 'Severe'],
      default: 'Mild'
    },
    reaction: String
  }],
  insuranceInfo: {
    provider: {
      type: String,
      trim: true
    },
    policyNumber: {
      type: String,
      trim: true
    },
    groupNumber: String,
    expiryDate: Date
  },
  currentMedications: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    dosage: String,
    frequency: String,
    startDate: Date,
    endDate: Date,
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  height: {
    type: Number,
    min: [50, 'Height must be at least 50 cm'],
    max: [250, 'Height cannot exceed 250 cm']
  },
  weight: {
    type: Number, 
    min: [1, 'Weight must be at least 1 kg'],
    max: [300, 'Weight cannot exceed 300 kg']
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: {
      type: String,
      default: 'India'
    }
  },
  occupation: {
    type: String,
    trim: true
  },
  maritalStatus: {
    type: String,
    enum: ['Single', 'Married', 'Divorced', 'Widowed'],
    default: 'Single'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});


patientProfileSchema.index({ userId: 1 });
patientProfileSchema.index({ bloodGroup: 1 });
patientProfileSchema.index({ isActive: 1 });



module.exports = mongoose.model('PatientProfile', patientProfileSchema); 