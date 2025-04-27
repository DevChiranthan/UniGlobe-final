const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const collegeRoutes = require('./routes/collegeRoutes');

require('dotenv').config();

const app = express();

// Enhanced CORS configuration with Netlify domain added
app.use(cors({
  origin: [
    'https://uniglobe-final.netlify.app',
    'http://localhost:3000'    // 👈 Add localhost also
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


// Parse JSON requests with increased size limit
app.use(express.json({ limit: '1mb' }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Connect to MongoDB with enhanced error logging
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    // Don't exit process - just log the error
  });

// Add connection event listeners
const db = mongoose.connection;
db.on('error', (err) => {
  console.error('MongoDB connection error during runtime:', err);
});
db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});
db.once('open', () => {
  console.log('MongoDB connection established and open');
});

// Routes
app.use('/api/colleges', collegeRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error('Express error handler caught:', err);
  res.status(500).json({ message: err.message || 'Server error' });
});

// Choose the appropriate port
const PORT = process.env.NODE_ENV === 'development' 
  ? process.env.DEV_PORT || 5001 
  : process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));