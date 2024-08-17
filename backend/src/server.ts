// backend/src/server.ts
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes';
import walletRoutes from './routes/walletRoutes'; // Adjust if necessary
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();
console.log("Google Client ID from .env:", process.env.GOOGLE_CLIENT_ID);
console.log("Google Client Secret from .env:", process.env.GOOGLE_CLIENT_SECRET);

import express from 'express';
import passport from './middleware/googleAuth';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20'; // Import GoogleStrategy

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/wallet', walletRoutes); // Adjust if necessary

const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI || '';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);
console.log("Google Client Secret:", process.env.GOOGLE_CLIENT_SECRET);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "/api/auth/google/callback",
    },
    async (
      accessToken: string, 
      refreshToken: string, 
      profile: Profile, 
      done: (error: any, user?: any) => void
    ) => {
      // Your user handling logic here
    }
  )
);
