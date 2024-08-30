// backend/src/routes/authRoutes.ts
import express, { Request, Response, NextFunction } from 'express';
import passport from '../middleware/googleAuth';
import { registerUser, loginUser } from '../controllers/authController';
import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';

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

router.get('/user', async (req, res) => {
  console.log('Received request to /api/auth/user');
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log('No authorization header');
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    console.log('No token in authorization header');
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { _id: string };
    console.log('Decoded token:', decoded);

    const user = await User.findById(decoded._id);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User found:', user);
    res.json({ user: { id: user._id, email: user.email, name: user.name } });
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
});

export default router;