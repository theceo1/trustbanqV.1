// src/pages/api/auth/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface LoginResponse {
  token: string;
}

interface AxiosErrorResponse {
  response?: {
    status?: number;
    data?: {
      message?: string;
    };
  };
}

function isAxiosError(error: unknown): error is AxiosErrorResponse {
  return typeof error === 'object' && error !== null && 'response' in error;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const backendUrl = process.env.BACKEND_URL || 'http://localhost:5001';
      const response = await axios.post<LoginResponse>(`${backendUrl}/api/auth/login`, req.body);
      
      // Set HTTP-only cookie with the token
      res.setHeader('Set-Cookie', `token=${response.data.token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`);
      
      res.status(200).json({ message: 'Login successful' });
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        res.status(error.response?.status || 500).json({ message: error.response?.data?.message || 'An error occurred during login' });
      } else {
        res.status(500).json({ message: 'An unexpected error occurred' });
      }
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}