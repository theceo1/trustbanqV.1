// backend/src/server.ts
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import passport from './middleware/googleAuth';
import authRoutes from './routes/authRoutes';

const app = express();

console.log('Starting server setup...');

app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(passport.initialize());
app.use(morgan('dev')); // Add request logging

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || '')
  .then(() => {
    console.log('MongoDB connected');
    // Optionally, you can list connected databases or collections here
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  });

console.log('Adding auth routes...');

// Mount auth routes under /api/auth
app.use('/api/auth', authRoutes);

// Optional: Add a root route for testing
app.get('/', (req, res) => {
  console.log('GET / called');
  res.send('TrustBanq API is running.');
});

// Optional: Catch-all route for undefined endpoints
app.use((req, res) => {
  console.warn(`Undefined route accessed: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ message: 'Route not found' });
});

// Optional: Error-handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
