//backend/src/controllers/authController.ts
import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';

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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ email, password: hashedPassword });
    await user.save();
    console.log(`User registered: ${email}`);

    const token = user.generateAuthToken();
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
    if (!user) {
      console.log('User not found for email:', email);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    console.log('User found:', user.email);
    console.log('User has password:', !!user.password);

    // Ensure user has a password before comparing
    if (!user.password) {
      console.log('User has no password set (possibly a Google OAuth user)');
      return res.status(400).json({ message: 'Invalid login method' });
    }

    // Use bcrypt to compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result:', isMatch);

    if (!isMatch) {
      console.log('Password mismatch for email:', email);
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    console.log('Login successful for email:', email);
    const token = user.generateAuthToken();
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in user:', error);
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    res.status(500).json({ message: 'Server error', error: error instanceof Error ? error.message : String(error) });
  }
};

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