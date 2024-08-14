// backend/src/routes/walletRoutes.ts
import express from 'express';
import { getWalletBalance } from '../controllers/walletController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/balance', authMiddleware, getWalletBalance);

export default router;
