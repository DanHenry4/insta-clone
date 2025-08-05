const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.routes');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 4001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/userdb';

mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`User service running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
