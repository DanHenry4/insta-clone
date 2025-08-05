const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const commentRoutes = require('./routes/comment.routes');

const app = express();
app.use(express.json());

app.use('/api/comments', commentRoutes);

const PORT = process.env.PORT || 4004;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/commentdb';

mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Comment service running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
