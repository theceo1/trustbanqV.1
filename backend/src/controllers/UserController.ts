import { Request, Response } from 'express';
import User from '../models/User';

class UserController {
  // Consolidated method to fetch user profile
  static async getUserProfile(req: Request, res: Response) {
    console.log('getUserProfile called');
    try {
      const user = req.user;
      console.log('User in getUserProfile:', user);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

export default UserController;
