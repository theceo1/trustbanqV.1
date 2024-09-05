import { Request, Response } from 'express';
import User from '../models/User';

class UserController {
  // Consolidated method to fetch user profile
  static async getUserProfile(req: Request, res: Response) {
    console.log('Inside UserController.getUserProfile');

    // Use optional chaining to safely access user id
    const userId = req.user?.id;
    console.log('Extracted user ID:', userId);

    if (!userId) {
      console.log('No user ID found in request');
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const user = await User.findById(userId).select('-password');
      if (!user) {
        console.log('User not found in database for ID:', userId);
        return res.status(404).json({ message: 'User not found' });
      }
      console.log('Returning user profile for email:', user.email);
      res.json({ id: user._id, email: user.email, name: user.name });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
}

export default UserController;
