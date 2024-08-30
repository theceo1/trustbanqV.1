// backend/src/server.ts
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/authRoutes';
import walletRoutes from './routes/walletRoutes';
import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express';
import passport from './middleware/googleAuth';

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(passport.initialize());

// Debugging middleware
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

// Test route
app.get('/test', (req, res) => {
  console.log('Main server test route accessed');
  res.json({ message: 'Main server test route working' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/wallet', walletRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err.message);
  res.status(500).json({ message: 'Something went wrong', error: err.message });
});

const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI || '';

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

mongoose.connect(MONGODB_URI, mongoOptions)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});