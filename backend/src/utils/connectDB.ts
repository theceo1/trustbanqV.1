// backend/utils/connectDB.ts

import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return; // Use existing database connection
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      // Use this for modern Mongoose versions (6+)
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
