const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');

// Debug server startup
console.log('🚀 Starting NexGen Health Backend Server...');
console.log('📋 Server Environment Variables:');
console.log('PORT:', process.env.PORT || '5000 (default)');
console.log('NODE_ENV:', process.env.NODE_ENV || 'Not set');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'NexGen Health API is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

console.log('🔄 Initializing database connection...');
try {
  connectDB();
} catch (error) {
  console.error('❌ Error connecting to database:', error);
  process.exit(1);
}

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
  console.log(`🌐 API available at: http://localhost:${port}`);
  console.log(`🔐 Auth endpoints:`);
  console.log(`   POST /api/auth/register`);
  console.log(`   POST /api/auth/login`);
});
