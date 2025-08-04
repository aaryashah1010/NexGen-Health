const { connectDB, sequelize } = require('./config/db');

async function setupDatabase() {
  console.log('🚀 Setting up NexGen Health Database...');
  
  try {
    // Connect to database
    await connectDB();
    
    console.log('✅ Database setup completed successfully!');
    console.log('📋 Tables created:');
    console.log('   - users');
    console.log('   - admin_profiles');
    console.log('   - patient_profiles');
    
    // Close the connection
    await sequelize.close();
    console.log('🔌 Database connection closed.');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    process.exit(1);
  }
}

// Run the setup
setupDatabase(); 