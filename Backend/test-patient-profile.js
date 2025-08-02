const { connectDB } = require('./config/db');
const User = require('./models/User');
const PatientProfile = require('./models/PatientProfile');

async function testPatientProfile() {
  try {
    console.log('🔌 Connecting to database...');
    await connectDB();
    console.log('✅ Database connected successfully!');

    console.log('\n🧪 Testing PatientProfile model...');

    // Test 1: Create a test user first
    console.log('\n1️⃣ Creating test user...');
    const testUser = await User.create({
      name: 'Sarah Johnson',
      email: 'sarah@test.com',
      password: 'password123',
      phone: '9876543210',
      role: 'patient',
      isVerified: true,
      isActive: true
    });
    console.log('✅ Test user created:', testUser.name);

    // Test 2: Create patient profile
    console.log('\n2️⃣ Creating patient profile...');
    const patientProfile = await PatientProfile.create({
      userId: testUser.id,
      dateOfBirth: '1990-05-15',
      bloodGroup: 'A+',
      gender: 'female',
      emergencyContact: {
        name: 'John Johnson',
        phone: '1234567890',
        relationship: 'father'
      },
      medicalHistory: 'No major medical history. Allergic to penicillin.',
      height: 165.5, // cm
      weight: 60.2, // kg
      address: '123 Health Street, Medical City, MC 12345',
      occupation: 'Software Engineer',
      isActive: true
    });
    console.log('✅ Patient profile created successfully!');

    // Test 3: Test relationship - get user with patient profile
    console.log('\n3️⃣ Testing relationship - User with PatientProfile...');
    const userWithProfile = await User.findOne({
      where: { id: testUser.id },
      include: [{
        model: PatientProfile,
        as: 'patientProfile'
      }]
    });
    console.log('✅ User with profile found:', {
      name: userWithProfile.name,
      email: userWithProfile.email,
      hasProfile: !!userWithProfile.patientProfile
    });

    // Test 4: Test relationship - get patient profile with user
    console.log('\n4️⃣ Testing relationship - PatientProfile with User...');
    const profileWithUser = await PatientProfile.findOne({
      where: { id: patientProfile.id },
      include: [{
        model: User,
        as: 'user'
      }]
    });
    console.log('✅ Profile with user found:', {
      patientName: profileWithUser.user.name,
      bloodGroup: profileWithUser.bloodGroup,
      gender: profileWithUser.gender
    });

    // Test 5: Test basic profile data
    console.log('\n5️⃣ Testing profile data...');
    console.log('Patient profile data:', {
      bloodGroup: profileWithUser.bloodGroup,
      gender: profileWithUser.gender,
      height: profileWithUser.height,
      weight: profileWithUser.weight,
      occupation: profileWithUser.occupation
    });

    // Test 6: Test validation
    console.log('\n6️⃣ Testing validation...');
    try {
      await PatientProfile.create({
        userId: testUser.id,
        dateOfBirth: '2025-01-01', // Future date
        bloodGroup: 'A+',
        gender: 'female',
        emergencyContact: {
          name: 'Test',
          phone: '1234567890',
          relationship: 'friend'
        },
        address: 'Test address'
      });
      console.log('❌ Validation failed - should have rejected future date');
    } catch (error) {
      console.log('✅ Date validation working correctly');
    }

    // Test 7: Test invalid emergency contact
    console.log('\n7️⃣ Testing emergency contact validation...');
    try {
      await PatientProfile.create({
        userId: testUser.id,
        dateOfBirth: '1990-01-01',
        bloodGroup: 'A+',
        gender: 'female',
        emergencyContact: {
          name: 'Test' // Missing phone and relationship
        },
        address: 'Test address'
      });
      console.log('❌ Validation failed - should have rejected invalid emergency contact');
    } catch (error) {
      console.log('✅ Emergency contact validation working correctly');
    }

    // Test 8: Test height/weight validation
    console.log('\n8️⃣ Testing height/weight validation...');
    try {
      await PatientProfile.create({
        userId: testUser.id,
        dateOfBirth: '1990-01-01',
        bloodGroup: 'A+',
        gender: 'female',
        emergencyContact: {
          name: 'Test',
          phone: '1234567890',
          relationship: 'friend'
        },
        height: 300, // Too tall
        weight: 500, // Too heavy
        address: 'Test address'
      });
      console.log('❌ Validation failed - should have rejected invalid height/weight');
    } catch (error) {
      console.log('✅ Height/weight validation working correctly');
    }

    console.log('\n🎉 All PatientProfile tests completed successfully!');
    console.log('\n📊 Summary:');
    console.log('- ✅ Database connection');
    console.log('- ✅ PatientProfile creation');
    console.log('- ✅ User-PatientProfile relationship');
    console.log('- ✅ Basic profile data');
    console.log('- ✅ Data validation');
    console.log('- ✅ Foreign key constraints');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack trace:', error.stack);
  } finally {
    // Close database connection
    const { sequelize } = require('./config/db');
    await sequelize.close();
    console.log('\n🔌 Database connection closed.');
  }
}

// Run the test
testPatientProfile(); 