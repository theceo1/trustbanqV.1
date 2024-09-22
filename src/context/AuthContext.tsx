// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect, useCallback, ReactNode } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUserData = useCallback(async (token: string) => {
    try {
      console.log('Fetching user data with token:', token);
      console.log('Full URL:', `${API_URL}/auth/user`);
      const response = await axios.get<{ user: User }>(`${API_URL}/auth/user`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('User data response:', response.data);
      const userData = response.data.user;
      setUser(userData);
      return userData;
    } catch (error) {
      console.error('Error fetching user data:', error);
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: unknown; status?: number; headers?: unknown } };
        console.error('Response data:', axiosError.response?.data);
        console.error('Response status:', axiosError.response?.status);
        console.error('Response headers:', axiosError.response?.headers);
      } else if (error instanceof Error) {
        console.error('Error message:', error.message);
      } else {
        console.error('Unexpected error:', error);
      }
      setUser(null);
      localStorage.removeItem('token');
      throw error;
    }
  }, []);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await fetchUserData(token);
      } catch (error) {
        console.error('Error during authentication check:', error);
      }
    }
    setLoading(false);
  }, [fetchUserData]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (token: string) => {
    localStorage.setItem('token', token);
    await fetchUserData(token);
    router.push('/dashboard');
  };

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('token');
    router.push('/login');
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};