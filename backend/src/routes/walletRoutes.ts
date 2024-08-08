import express from 'express';
import { getWalletBalance } from '../controllers/walletController';

const router = express.Router();

// Define the route to get the wallet balance
router.get('/balance', getWalletBalance);

export { router as walletRoutes };
