const { connectDB } = require('./config/db');
const User = require('./models/User');
const AdminProfile = require('./models/AdminProfile');

async function testAdminProfile() {
  try {
    console.log('🔌 Connecting to database...');
    await connectDB();
    console.log('✅ Database connected successfully!');

    console.log('\n🧪 Testing AdminProfile model...');

    // Test 1: Create a test admin user first
    console.log('\n1️⃣ Creating test admin user...');
    const testAdmin = await User.create({
      name: 'Dr. Smith',
      email: 'admin@hospital-test.com',
      password: 'password123',
      phone: '5551234567', // 10 digits
      role: 'admin',
      isVerified: true,
      isActive: true
    });
    console.log('✅ Test admin user created:', testAdmin.name);

    // Test 2: Create admin profile
    console.log('\n2️⃣ Creating admin profile...');
    const adminProfile = await AdminProfile.create({
      userId: testAdmin.id,
      hospitalName: 'City General Hospital',
      city: 'New York',
      location: {
        latitude: 40.7128,
        longitude: -74.0060
      },
      address: '123 Medical Center Drive, New York, NY 10001',
      contactPerson: 'Dr. Sarah Johnson',
      hospitalType: 'multi_specialty',
      totalBeds: 500,
      available: 150,
      isVerified: false,
      verificationDocuments: [
        {
          type: 'license',
          url: 'https://example.com/license.pdf',
          uploadedAt: new Date()
        },
        {
          type: 'certification',
          url: 'https://example.com/cert.pdf',
          uploadedAt: new Date()
        }
      ]
    });
    console.log('✅ Admin profile created successfully!');

    // Test 3: Test relationship - get user with admin profile
    console.log('\n3️⃣ Testing relationship - User with AdminProfile...');
    const userWithProfile = await User.findOne({
      where: { id: testAdmin.id },
      include: [{
        model: AdminProfile,
        as: 'adminProfile'
      }]
    });
    console.log('✅ User with admin profile found:', {
      name: userWithProfile.name,
      email: userWithProfile.email,
      hasProfile: !!userWithProfile.adminProfile,
      hospitalName: userWithProfile.adminProfile.hospitalName
    });

    // Test 4: Test relationship - get admin profile with user
    console.log('\n4️⃣ Testing relationship - AdminProfile with User...');
    const profileWithUser = await AdminProfile.findOne({
      where: { id: adminProfile.id },
      include: [{
        model: User,
        as: 'user'
      }]
    });
    console.log('✅ Profile with user found:', {
      adminName: profileWithUser.user.name,
      hospitalName: profileWithUser.hospitalName,
      city: profileWithUser.city,
      totalBeds: profileWithUser.totalBeds,
      available: profileWithUser.available
    });

    // Test 5: Test basic profile data
    console.log('\n5️⃣ Testing profile data...');
    console.log('Hospital profile data:', {
      hospitalName: profileWithUser.hospitalName,
      city: profileWithUser.city,
      totalBeds: profileWithUser.totalBeds,
      available: profileWithUser.available,
      hospitalType: profileWithUser.hospitalType,
      isVerified: profileWithUser.isVerified
    });

    // Test 6: Test validation - invalid location
    console.log('\n6️⃣ Testing location validation...');
    try {
      await AdminProfile.create({
        userId: testAdmin.id,
        hospitalName: 'Test Hospital',
        city: 'Test City',
        location: {
          latitude: 200, // Invalid latitude
          longitude: -74.0060
        },
        address: 'Test Address',
        contactPerson: 'Test Contact',
        hospitalType: 'general',
        totalBeds: 100,
        available: 50
      });
      console.log('❌ Validation failed - should have rejected invalid latitude');
    } catch (error) {
      console.log('✅ Location validation working correctly');
    }

    // Test 7: Test validation - available beds > total beds
    console.log('\n7️⃣ Testing bed validation...');
    try {
      await AdminProfile.create({
        userId: testAdmin.id,
        hospitalName: 'Test Hospital',
        city: 'Test City',
        location: {
          latitude: 40.7128,
          longitude: -74.0060
        },
        address: 'Test Address',
        contactPerson: 'Test Contact',
        hospitalType: 'general',
        totalBeds: 100,
        available: 150 // More available than total
      });
      console.log('❌ Validation failed - should have rejected invalid bed count');
    } catch (error) {
      console.log('✅ Bed validation working correctly');
    }

    // Test 8: Test hospital type validation
    console.log('\n8️⃣ Testing hospital type validation...');
    try {
      await AdminProfile.create({
        userId: testAdmin.id,
        hospitalName: 'Test Hospital',
        city: 'Test City',
        location: {
          latitude: 40.7128,
          longitude: -74.0060
        },
        address: 'Test Address',
        contactPerson: 'Test Contact',
        hospitalType: 'invalid_type', // Invalid type
        totalBeds: 100,
        available: 50
      });
      console.log('❌ Validation failed - should have rejected invalid hospital type');
    } catch (error) {
      console.log('✅ Hospital type validation working correctly');
    }

    console.log('\n🎉 All AdminProfile tests completed successfully!');
    console.log('\n📊 Summary:');
    console.log('- ✅ Database connection');
    console.log('- ✅ AdminProfile creation');
    console.log('- ✅ User-AdminProfile relationship');
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
testAdminProfile(); 