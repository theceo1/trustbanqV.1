// backend/src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  console.log('authenticateToken middleware called');
  const authHeader = req.headers['authorization'];
  console.log('Authorization Header:', authHeader);

  if (!authHeader) {
    console.log('Authorization header is missing');
    return res.status(401).json({ message: 'Authorization header is required' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Token:', token);

  if (!token) {
    console.log('Token not provided');
    return res.status(401).json({ message: 'Token is required' });
  }

  try {
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not set');
      return res.status(500).json({ message: 'Internal server error: JWT secret is not configured' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { _id: string };
    console.log('Token decoded:', decoded);

    const user = await User.findById(decoded._id);
    console.log('User found:', user ? user.email : 'No user found');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user; // Attach user to request object
    next(); // Proceed to next middleware or route handler
  } catch (error) {
    console.error('Error authenticating token:', error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
};