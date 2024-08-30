// backend/src/routes/authRoutes.ts


import express, { Request, Response, NextFunction } from 'express';
import passport from '../middleware/googleAuth';
import { registerUser, loginUser } from '../controllers/authController';
import User, { IUser } from '../models/User';

const router = express.Router();

// Registration route
router.post('/register', registerUser);

// Login route
router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  console.log('Login attempt received:', req.body);
  loginUser(req, res);
});

// Google OAuth login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback
router.get(
  '/google/callback',
  (req, res, next) => {
    passport.authenticate('google', { failureRedirect: '/login', session: false }, (err, user, info) => {
      if (err) {
        console.error('Error in Google authentication:', err);
        return res.status(500).json({ error: 'Authentication failed' });
      }
      if (!user) {
        console.error('No user returned from Google authentication');
        return res.status(401).json({ error: 'Authentication failed' });
      }
      req.user = user;
      next();
    })(req, res, next);
  },
  (req: Request, res: Response) => {
    const user = req.user as IUser;
    const token = user.generateAuthToken();
    res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
  }
);

router.get('/checkuser/:email', async (req, res) => {
  console.log('Checking user for email:', req.params.email);
  try {
    const user = await User.findOne({ email: req.params.email });
    if (user) {
      console.log('User found:', user.email);
      res.json({ exists: true, hasPassword: !!user.password });
    } else {
      console.log('User not found');
      res.json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking user:', error);
    res.status(500).json({ message: 'Error checking user' });
  }
});

router.get('/test', (req, res) => {
  console.log('Auth test route accessed');
  res.json({ message: 'Auth test route working' });
});

export default router;