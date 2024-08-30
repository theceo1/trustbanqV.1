// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect, useCallback, ReactNode } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const API_URL = 'http://localhost:5001/api';

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

  const logout = useCallback(() => {
    console.log('Logout initiated');
    setUser(null);
    localStorage.removeItem('token');
    console.log('User state cleared and token removed from localStorage');
    router.push('/login');
    console.log('Redirected to login page');
  }, [router]);

  const fetchUserData = useCallback(async (token: string) => {
    try {
      console.log('Fetching user data with token:', token);
      const response = await axios.get<{ user: User }>(`${API_URL}/auth/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('User data received:', response.data);
      setUser(response.data.user);
      console.log('User state updated:', response.data.user);
    } catch (error: unknown) {
      console.error('Error fetching user data:', error);
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: unknown; status?: number } };
        if (axiosError.response) {
          console.error('Response data:', axiosError.response.data);
          console.error('Response status:', axiosError.response.status);
          if (axiosError.response.status === 401) {
            console.log('Token is invalid or expired. Logging out.');
            logout();
          }
        }
      } else {
        console.error('Non-Axios error:', error);
      }
      setUser(null);
      console.log('User state cleared due to error');
    }
  }, [logout]);

  useEffect(() => {
    const checkAuth = async () => {
      console.log('Checking authentication state...');
      const token = localStorage.getItem('token');
      if (token) {
        console.log('Token found in localStorage, fetching user data');
        await fetchUserData(token);
      } else {
        console.log('No token found in localStorage');
      }
      setLoading(false);
      console.log('Authentication check complete');
    };
    checkAuth();
  }, [fetchUserData]);

  const login = async (token: string) => {
    console.log('Login attempt with token:', token);
    localStorage.setItem('token', token);
    console.log('Token stored in localStorage');
    await fetchUserData(token);
    if (user) {
      console.log('Login successful, redirecting to dashboard');
      router.push('/dashboard');
    } else {
      console.log('Login failed, user data not fetched');
    }
  };

  console.log('Current auth state:', { user, loading });

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    console.error('useAuth called outside of AuthProvider');
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};