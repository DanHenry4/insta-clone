const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./routes/post.routes');
require('dotenv').config();
const path = require('path');

const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 4002;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/postdb';

mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Post service running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
