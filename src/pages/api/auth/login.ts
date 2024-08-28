// src/pages/api/auth/login.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

interface LoginResponse {
  token: string;
  // Add other properties if needed
}

interface AxiosErrorResponse {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
    headers?: Record<string, string>;
  };
  message?: string;
}

function isAxiosError(error: unknown): error is AxiosErrorResponse {
  return typeof error === 'object' && error !== null && 'response' in error;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Received request method:', req.method);
  console.log('Received request headers:', req.headers);
  console.log('Received request body:', req.body);

  if (req.method === 'POST') {
    try {
      const backendUrl = process.env.BACKEND_URL || 'http://localhost:5001';
      console.log('BACKEND_URL:', backendUrl);
      console.log('Received login request:', req.body);
      console.log('Sending request to:', `${backendUrl}/api/auth/login`);
      
      const response = await axios.post<LoginResponse>(`${backendUrl}/api/auth/login`, req.body);
      
      console.log('Backend response:', response.data);
      console.log('Backend status:', response.status);
      
      // Set HTTP-only cookie with the token
      res.setHeader('Set-Cookie', `token=${response.data.token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`);
      
      res.status(200).json({ message: 'Login successful' });
    } catch (error: unknown) {
      console.error('Login error:', error);
      if (isAxiosError(error)) {
        console.error('Backend error response:', error.response?.data);
        console.error('Backend error status:', error.response?.status);
        console.error('Backend error headers:', error.response?.headers);
        res.status(error.response?.status || 500).json({ message: error.response?.data?.message || 'An error occurred during login' });
      } else {
        console.error('Non-Axios error:', error);
        res.status(500).json({ message: 'An unexpected error occurred' });
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}