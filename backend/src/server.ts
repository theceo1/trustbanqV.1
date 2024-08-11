import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import { walletRoutes } from './routes/walletRoutes'; // Use named import
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS for all routes

app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/wallet', walletRoutes); // Use wallet routes

const mongoOptions: ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions;


mongoose
  .connect(process.env.MONGO_URI || '', {})
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log(error));
