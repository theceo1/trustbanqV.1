// backend/src/routes/authRoutes.ts
import express from 'express';
import passport from '../middleware/googleAuth';
import { registerUser, loginUser } from '../controllers/authController';
import { authenticateToken } from '../middleware/authMiddleware';
import UserController from '../controllers/UserController';

const router = express.Router();

console.log('Defining routes in authRoutes.ts');

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
router.get('/user', authenticateToken, (req, res, next) => {
  console.log('GET /user called');
  UserController.getUserProfile(req, res);
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

// Debug Route to List Registered Routes
router.get('/debug', (req, res) => {
  console.log('Debug route accessed');
  const registeredRoutes = router.stack
    .filter((layer: any) => layer.route)
    .map((layer: any) => ({
      path: layer.route.path,
      method: Object.keys(layer.route.methods)[0].toUpperCase()
    }));
  
  console.log('Registered Routes:', registeredRoutes);
  res.json({
    message: 'Debug route working',
    routes: registeredRoutes
  });
});

console.log('Auth routes module loaded');
export default router;

