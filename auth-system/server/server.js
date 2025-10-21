// server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- 1. Database Connection ---
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit process with failure
  }
};

// --- 2. Middleware ---
// Enable CORS for all routes (to allow frontend connection)
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your actual frontend URL/port
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

// Body parser to accept JSON data
app.use(express.json());

// --- 3. Initial Route (Test) ---
app.get('/', (req, res) => {
    res.send('API is running...');
});

// --- 4. Main Auth Routes ---
// The frontend calls /api/auth/register and /api/auth/login
// We will create the authRoutes file next
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);


// --- 5. Start Server ---
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});