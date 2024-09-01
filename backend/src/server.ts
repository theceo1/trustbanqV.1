// backend/src/server.ts
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import passport from './middleware/googleAuth';
import authRoutes from './routes/authRoutes';

const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(passport.initialize());

async function startServer() {
  app.use('/api/auth', authRoutes);

  const PORT = process.env.PORT || 5001;
  const MONGODB_URI = process.env.MONGODB_URI || '';

  console.log(`Attempting to connect to MongoDB at URI: ${MONGODB_URI}`);

  try {
    await mongoose.connect(MONGODB_URI); // Ensure your MongoDB URI is correctly formatted and accessible
    console.log('Successfully connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

startServer().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});