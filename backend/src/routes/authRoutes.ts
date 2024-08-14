// backend/src/routes/authRoutes.ts
import express from 'express';
import { registerUser, loginUser } from '../controllers/authController'; // Correct import

const router = express.Router();

router.post('/register', registerUser);  // Route for user registration
router.post('/login', loginUser);        // Route for user login

export default router;
