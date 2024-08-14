import express from 'express';
import authRoutes from './routes/authRoutes';
import walletRoutes from './routes/walletRoutes'; // Adjust if necessary
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from the .env file

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
