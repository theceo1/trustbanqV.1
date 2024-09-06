// backend/src/controllers/authController.ts
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';

// Register User
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  console.log('Register User Controller called');
  const { email, password, name } = req.body;

  if (!email || !password) {
    console.log('Registration failed: Missing email or password');
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      console.log('Registration failed: User already exists with email:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      email,
      password: hashedPassword,
      name,
    });

    await user.save();
    console.log('User registered successfully:', email);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error in registerUser:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login User
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  console.log('Login User Controller called');
  const { email, password } = req.body;

  if (!email || !password) {
    console.log('Login failed: Missing email or password');
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Login failed: No user found with email:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Login failed: Incorrect password for email:', email);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = user.generateAuthToken();
    console.log('User logged in successfully:', email);
    res.json({ token });
  } catch (error) {
    console.error('Error in loginUser:', error);
    res.status(500).json({ message: 'Server error' });
  }
};