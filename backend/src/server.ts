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
  credentials: true,
}));
app.use(passport.initialize());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/wallet', walletRoutes);

const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI || '';

// Log environment variables
console.log("Environment Variables:");
console.log("PORT:", PORT);
console.log("MONGODB_URI:", MONGODB_URI);
console.log("Google Client ID:", process.env.GOOGLE_CLIENT_ID);
console.log("Google Client Secret:", process.env.GOOGLE_CLIENT_SECRET?.substring(0, 5) + '...');

// MongoDB connection
mongoose.connect(MONGODB_URI, {
  tls: true,
  tlsAllowInvalidCertificates: true,  // Keep this for testing only
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit the process if unable to connect to MongoDB
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Google Strategy configuration
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile: Profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.create({
            googleId: profile.id,
            email: profile.emails?.[0]?.value || '',
            name: profile.displayName,
          });
        }
        done(null, user);
      } catch (error) {
        done(error as Error, undefined);
      }
    }
  )
);

// For debugging purposes
console.log("MongoDB URI (masked):", MONGODB_URI.replace(/\/\/.*@/, '//<credentials>@'));
