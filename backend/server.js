const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const syllabusRoutes = require('./routes/syllabus');

const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is not defined');
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message || err);
    process.exit(1);
  });

app.use('/api/auth', authRoutes);
app.use('/api/syllabus', syllabusRoutes);

// Serve signup page
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.get('/', (req, res) => {
  res.send('Smart Student Tracker API running...');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
