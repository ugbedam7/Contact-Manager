const express = require('express');
const connectDB = require('./database/db');
const authRoutes = require('./routes/user');
const cors = require('cors');
require('dotenv').config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contacts', require('./routes/contact'));

// Start Server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}...`);
    });
  } catch (err) {
    console.log(err.message);
  }
};

start();
