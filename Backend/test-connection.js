const { connectDB } = require('./config/db');

async function testConnection() {
  try {
    console.log('🔄 Testing PostgreSQL connection...');
    
    if (!process.env.DATABASE_URL) {
      console.error('❌ DATABASE_URL not found in environment variables');
      console.error('Please add DATABASE_URL to your .env file');
      process.exit(1);
    }
    
    console.log('📊 Connection string found ✅');
    console.log('📊 Database URL:', process.env.DATABASE_URL.substring(0, 20) + '...');
    
    await connectDB();
    console.log('✅ PostgreSQL connection successful!');
    console.log('🎉 Database is ready for use!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error('Error:', error.message);
    console.error('\n🔧 Troubleshooting tips:');
    console.error('1. Check your .env file has DATABASE_URL');
    console.error('2. Verify Supabase connection string is correct');
    console.error('3. Ensure database is accessible');
    process.exit(1);
  }
}

testConnection(); 