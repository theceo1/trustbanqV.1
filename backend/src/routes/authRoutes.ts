// backend/src/routes/authRoutes.ts
import express, { Request, Response } from 'express';
import passport from '../middleware/googleAuth';
import { registerUser, loginUser } from '../controllers/authController';
import { IUser } from '../models/User';

const router = express.Router();

// Registration route
router.post('/api/auth/register', (req, res, next) => {
  console.log('Register route hit:', req.body);
  next();
}, registerUser);

// Login route
router.post('/api/auth/login', (req, res, next) => {
  console.log('Login route hit:', req.body);
  next();
}, loginUser);

// Google OAuth login
router.get('/api/auth/google', (req, res, next) => {
  console.log('Google OAuth route hit');
  next();
}, passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback
router.get(
  '/api/auth/google/callback',
  (req, res, next) => {
    console.log('Google OAuth callback route hit');
    next();
  },
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req: Request, res: Response) => {
    const user = req.user as IUser;
    console.log('Google OAuth callback - user:', user);
    const token = user ? user.generateAuthToken() : null;
    console.log('Generated token:', token);

    if (token) {
      // Redirect with token in query params
      res.redirect(`http://localhost:3000/?token=${token}`);
    } else {
      res.redirect('http://localhost:3000/login');
    }
  }
);

export default router;
