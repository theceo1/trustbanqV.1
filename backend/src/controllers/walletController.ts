// backend/src/controllers/walletController.ts
import { Request, Response } from 'express';
import { getBalance } from '../services/walletService';
import { IUser } from '../models/User';

interface AuthenticatedRequest extends Request {
  user?: IUser;
}

export const getWalletBalance = async (req: Request, res: Response) => {
  const authenticatedReq = req as AuthenticatedRequest;

  try {
    if (!authenticatedReq.user || !authenticatedReq.user._id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const userId = authenticatedReq.user._id.toString();
    const balance = await getBalance(userId);
    return res.status(200).json({ balance });
  } catch (error) {
    console.error('Error fetching wallet balance:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
