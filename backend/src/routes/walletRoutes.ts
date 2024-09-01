// backend/src/routes/walletRoutes.ts
import express from 'express';
import { getWalletBalance } from '../controllers/walletController';
import { authenticateToken } from '../middleware/authMiddleware';
const router = express.Router();

router.get('/balance', authenticateToken, getWalletBalance);

export default router;