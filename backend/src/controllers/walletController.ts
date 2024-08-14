// backend/src/controllers/walletController.ts
import { Request, Response } from 'express';
import { getBalance } from '../services/walletService';
import { IUser } from '../models/User';

interface AuthenticatedRequest extends Request {
  user?: IUser; // Explicitly declare the user property as optional and of type IUser
}

export const getWalletBalance = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const userId = req.user._id.toString(); // Safe to access _id as we've checked if user exists
    const balance = await getBalance(userId);
    res.status(200).json({ balance });
  } catch (error) {
    console.error('Error fetching wallet balance:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
