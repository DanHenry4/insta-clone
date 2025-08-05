const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./routes/post.routes');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 4002;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/postdb';

mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Post service running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
