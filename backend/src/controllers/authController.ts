// backend/src/controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(`Attempting to register user with email: ${email}`);

    if (!email || !password) {
      console.log('Registration error: Email and password are required');
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Registration error: User already exists');
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    console.log(`User registered: ${email}`);

    const token = user.generateAuthToken(); // Ensure this method is correctly implemented
    console.log(`Token generated for new registration: ${token}`);
    res.status(201).json({ token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login an existing user
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(`Login attempt for email: ${email}`);

    if (!email || !password) {
      console.log('Missing email or password');
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log('Invalid email or password');
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    console.log('Login successful for email:', email);
    const token = user.generateAuthToken();
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user profile (requires authentication)
export const getUserProfile = (req: Request, res: Response) => {
  console.log('getUserProfile function called');
  const user = (req as any).user;
  if (!user) {
    console.log('No user found in request');
    return res.status(401).json({ message: 'Unauthorized' });
  }
  console.log('Returning user profile:', user.email);
  res.json({ user: { id: user._id, email: user.email, name: user.name } });
};
