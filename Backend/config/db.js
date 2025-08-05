const { Sequelize } = require('sequelize');
require('dotenv').config();

// Debug environment variables
console.log('🔍 Environment Variables Debug:');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? '✅ Set' : '❌ Not set');
console.log('NODE_ENV:', process.env.NODE_ENV || 'Not set');
console.log('PORT:', process.env.PORT || 'Not set');

// If DATABASE_URL is set, show the hostname
if (process.env.DATABASE_URL) {
  try {
    const url = new URL(process.env.DATABASE_URL);
    console.log('Database Host:', url.hostname);
    console.log('Database Port:', url.port);
    console.log('Database Name:', url.pathname.substring(1));
  } catch (error) {
    console.log('❌ Invalid DATABASE_URL format');
  }
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: true
  },
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? {
      require: true,
      rejectUnauthorized: false
    } : false
  }
});

const connectDB = async () => {
  try {
    console.log('🔄 Attempting to connect to database...');
    await sequelize.authenticate();
    console.log('✅ Supabase PostgreSQL database connected successfully.');
    
    // Import models after database connection is established
    console.log('📦 Loading models...');
    require('../models');
    
    // Sync all models with database
    console.log('🔄 Syncing database models...');
    await sequelize.sync({ alter: true });
    console.log('✅ Database synchronized.');
  } catch (error) {
    console.error('❌ Error connecting to database:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };