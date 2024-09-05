// backend/src/routes/authRoutes.ts

import express from 'express';
import passport from '../middleware/googleAuth';
import { registerUser, loginUser } from '../controllers/authController';
import { authenticateToken } from '../middleware/authMiddleware';
import UserController from '../controllers/UserController';

const router = express.Router();

console.log('Defining routes in authRoutes.ts');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user', authenticateToken, UserController.getUserProfile); // Ensure this controller method exists and is properly exported

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    const user = req.user as any;
    const token = user.generateAuthToken();
    console.log(`Token generated for user: ${user.email}`);
    res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
  }
);

// Route to get user profile, using authenticateToken middleware
router.get('/user', authenticateToken, UserController.getUserProfile);

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

console.log('Auth routes module loaded');
export default router;
