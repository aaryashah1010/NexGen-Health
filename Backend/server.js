const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes aavu rakhis
app.get('/', (req, res) => {
  res.json({ message: 'NexGen Health API is running!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});
try {
  connectDB();
} catch (error) {
  console.error('Error connecting to database:', error);
  process.exit(1);
}
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});