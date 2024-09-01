// backend/src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  console.log('Authenticating token...');
  console.log('authenticateToken middleware called');
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not set');
      return res.status(500).json({ message: 'Internal server error' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { _id: string };
    console.log('Token decoded:', decoded);

    const user = await User.findById(decoded._id);
    if (!user) {
      console.log('User not found for token');
      return res.status(401).json({ message: 'User not found' });
    }

    (req as any).user = user;
    console.log('User authenticated:', user.email);
    next();
  } catch (error) {
    console.error('Error authenticating token:', error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
};