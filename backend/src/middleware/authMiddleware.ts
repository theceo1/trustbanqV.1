// backend/src/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  console.log('Auth middleware called');
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'Access Denied: No Token Provided!' });
  }

  try {
    console.log('Verifying token');
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    console.log('Decoded token:', decoded);
    const user = await User.findById(decoded._id) as IUser;

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User found:', user.email);
    (req as any).user = user;
    next();
  } catch (err) {
    console.error('Error in auth middleware:', err);
    res.status(400).json({ message: 'Invalid Token' });
  }
};

// Export the middleware with both names
export const authenticateToken = authMiddleware;