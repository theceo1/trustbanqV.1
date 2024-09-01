// backend/src/controllers/UserController.ts
import { Request, Response } from 'express';

class UserController {
  static getUserProfile(req: Request, res: Response) {
    // Assuming the user object is attached to the request by the authenticateToken middleware
    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(req.user);
  }
}

export default UserController;