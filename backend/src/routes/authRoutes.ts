// backend/src/routes/authRoutes.ts

import express, { Request, Response } from 'express';
import passport from '../middleware/googleAuth';
import { registerUser, loginUser } from '../controllers/authController';
import { authenticateToken } from '../middleware/authMiddleware';
import UserController from '../controllers/UserController'; // Ensure UserController is correctly implemented

const router = express.Router();

console.log('Defining routes in authRoutes.ts');

// Registration route
console.log('Defining /register route');
router.post('/register', registerUser);

// Login route
console.log('Defining /login route');
router.post('/login', loginUser);

// Google OAuth login
console.log('Defining /google route');
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback
console.log('Defining /google/callback route');
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req: Request, res: Response) => {
    const user = req.user as any; // Cast to any to access custom methods
    const token = user.generateAuthToken();
    res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
  }
);

// User profile route with authentication
console.log('Defining /user route with authentication');
router.get('/user', authenticateToken, (req, res) => {
  console.log('Reached /user route');
  if (!req.user) {
    console.log('No user attached to request');
    return res.status(404).json({ message: 'User not found' });
  }
  UserController.getUserProfile(req, res);
});

// Debug route
console.log('Defining /debug route');
router.get('/debug', (req, res) => {
  console.log('Debug route accessed');
  res.json({
    message: 'Debug route working',
    routes: router.stack.map((r: any) => ({
      path: r.route?.path,
      method: r.route?.stack[0]?.method
    }))
  });
});

console.log('Exporting auth routes');
export default router;