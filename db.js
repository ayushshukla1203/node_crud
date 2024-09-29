const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB

// const mongoURL = 'mongodb://127.0.0.1:27017/hotels';
const mongoURL = process.env.DB_URL;


mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});
