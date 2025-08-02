const { Sequelize } = require('sequelize');
require('dotenv').config();

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
    await sequelize.authenticate();
    console.log('✅ Supabase PostgreSQL database connected successfully.');
    
    // Sync all models with database
    await sequelize.sync({ alter: true });
    console.log('✅ Database synchronized.');
  } catch (error) {
    console.error('❌ Error connecting to database:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };