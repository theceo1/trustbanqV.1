// backend/src/server.ts
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/authRoutes';
import walletRoutes from './routes/walletRoutes';
import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express';
import passport from './middleware/googleAuth';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import User from './models/User';

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/wallet', walletRoutes);

const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI || '';

const mongoOptions = {
  tls: true,
  tlsAllowInvalidCertificates: false, // Set to true if using a self-signed certificate (for testing only)
  serverSelectionTimeoutMS: 5000, // Set a timeout for server selection
  socketTimeoutMS: 45000, // Socket timeout for MongoDB operations
};

// Debugging output
console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);
console.log("Google Client Secret:", process.env.GOOGLE_CLIENT_SECRET);
console.log("Environment Variables:");
console.log("PORT:", PORT);
console.log("MONGODB_URI:", MONGODB_URI);
console.log("MongoDB URI (masked):", MONGODB_URI.replace(/\/\/.*@/, '//<credentials>@'));
console.log("MongoDB connection options:", mongoOptions);

mongoose.connect(MONGODB_URI, mongoOptions)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if unable to connect to MongoDB
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
