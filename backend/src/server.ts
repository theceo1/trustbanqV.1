// backend/src/server.ts
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';  // Import CORS middleware
import mongoose from 'mongoose';  // Import MongoDB connection
import passport from './middleware/googleAuth';  // Import Passport configuration
import authRoutes from './routes/authRoutes';  // Import routes

const app = express();

app.use(express.json());  // Middleware for parsing JSON bodies
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',  // Configure CORS
  credentials: true,
}));
app.use(passport.initialize());  // Initialize Passport middleware

// Simplified MongoDB connection setup
mongoose.connect(process.env.MONGODB_URI || '')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);  // Use the auth routes

// Temporary test route directly in server.ts to ensure basic routing works
app.get('/api/auth/test', (req, res) => {
  res.status(200).send('Test route is working');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});