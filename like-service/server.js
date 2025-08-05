const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const likeRoutes = require('./routes/like.routes');

const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

app.use('/api/likes', likeRoutes);

const PORT = process.env.PORT || 4005;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/likedb';

mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Like service running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
