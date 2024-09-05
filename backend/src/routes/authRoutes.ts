import express from 'express';
import passport from '../middleware/googleAuth';
import { registerUser, loginUser } from '../controllers/authController';
import { authenticateToken } from '../middleware/authMiddleware';
import UserController from '../controllers/UserController';

const router = express.Router();

console.log('Defining routes in authRoutes.ts');

router.use((req, res, next) => {
  console.log(`Auth route accessed: ${req.method} ${req.url}`);
  next();
});

// Register Route
router.post('/register', (req, res, next) => {
  console.log('POST /register called');
  registerUser(req, res, next);
});

// Login Route
router.post('/login', (req, res, next) => {
  console.log('POST /login called');
  loginUser(req, res, next);
});

// User Profile Route
router.get('/user', (req, res, next) => {
  console.log('GET /user route handler called');
  authenticateToken(req, res, (err) => {
    if (err) {
      console.log('Authentication failed:', err);
      return res.status(401).json({ message: 'Authentication failed' });
    }
    console.log('Authentication successful, calling getUserProfile');
    UserController.getUserProfile(req, res);
  });
});

// Google OAuth Routes
router.get('/google', (req, res, next) => {
  console.log('GET /google called');
  passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    const user = req.user as any;
    const token = user.generateAuthToken();
    console.log(`Token generated for user: ${user.email}`);
    res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);
  }
);

export default router;

