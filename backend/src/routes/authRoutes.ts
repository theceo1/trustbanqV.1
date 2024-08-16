// backend/src/routes/authRoutes.ts
import express from 'express';
import passport from '../middleware/googleAuth';
import { registerUser, loginUser } from '../controllers/authController';
import { IUser } from '../models/User';  // Import IUser from the correct location

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Google OAuth login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    const user = req.user as IUser;
    const token = user.generateAuthToken();  // Use generateAuthToken, make sure it's implemented in your model
    res.redirect(`/dashboard?token=${token}`);
  }
);

export default router;
