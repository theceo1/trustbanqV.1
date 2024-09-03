// backend/src/controllers/UserController.ts
import { Request, Response } from 'express';
import User from '../models/User'; // Ensure User model is correctly imported

class UserController {
  static async getUserProfile(req: Request, res: Response) {
    console.log('getUserProfile method called');  // Debugging line
    const userId = (req as any).user?._id; // Safely access user ID
    if (!userId) {
      console.log('No user found in request');
      return res.status(404).json({ message: 'User not found' });
    }
    try {
      const user = await User.findById(userId);
      if (!user) {
        console.log('User not found in database');
        return res.status(404).json({ message: 'User not found in database' });
      }
      console.log('User profile:', { id: user._id, email: user.email });
      res.json({ user: { id: user._id, email: user.email, name: user.name } });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Error fetching user data' });
    }
  }
}

export default UserController;