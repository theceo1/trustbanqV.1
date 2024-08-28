// backend/src/routes/authRoutes.ts

import express, { Request, Response } from 'express';
import passport from '../middleware/googleAuth';
import { registerUser, loginUser } from '../controllers/authController';
import { IUser } from '../models/User';

const router = express.Router();

// Registration route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Google OAuth login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req: Request, res: Response) => {
    const user = req.user as IUser;
    const token = user ? user.generateAuthToken() : null;

    if (token) {
      // Redirect with token in query params
      res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
    } else {
      res.redirect(`${process.env.FRONTEND_URL}/login`);
    }
  }
);

export default router;