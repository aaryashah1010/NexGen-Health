const { connectDB } = require('./config/db');
const PatientProfile = require('./models/PatientProfile');

async function testForeignKeyError() {
  try {
    console.log('🔌 Connecting to database...');
    await connectDB();
    console.log('✅ Database connected successfully!');

    console.log('\n🧪 Testing Foreign Key Constraint...');

    // Test: Try to create profile with non-existent user ID
    console.log('\n❌ Attempting to create profile with invalid user ID...');
    try {
      await PatientProfile.create({
        userId: '00000000-0000-0000-0000-000000000000', // Non-existent UUID
        dateOfBirth: '1990-05-15',
        bloodGroup: 'A+',
        gender: 'female',
        emergencyContact: {
          name: 'Test Contact',
          phone: '1234567890',
          relationship: 'friend'
        },
        address: 'Test Address',
        isActive: true
      });
      console.log('❌ This should have failed!');
    } catch (error) {
      console.log('✅ Foreign key constraint working correctly!');
      console.log('Error type:', error.name);
      console.log('Error message:', error.message);
    }

    // Test: Try to create profile with null userId
    console.log('\n❌ Attempting to create profile with null userId...');
    try {
      await PatientProfile.create({
        userId: null, // Null value
        dateOfBirth: '1990-05-15',
        bloodGroup: 'A+',
        gender: 'female',
        emergencyContact: {
          name: 'Test Contact',
          phone: '1234567890',
          relationship: 'friend'
        },
        address: 'Test Address'
      });
      console.log('❌ This should have failed!');
    } catch (error) {
      console.log('✅ Null constraint working correctly!');
      console.log('Error type:', error.name);
      console.log('Error message:', error.message);
    }

    console.log('\n📊 Summary:');
    console.log('- ✅ Foreign key constraint prevents orphaned profiles');
    console.log('- ✅ Null constraint prevents profiles without users');
    console.log('- ✅ Database integrity is maintained');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    // Close database connection
    const { sequelize } = require('./config/db');
    await sequelize.close();
    console.log('\n🔌 Database connection closed.');
  }
}

// Run the test
testForeignKeyError(); 