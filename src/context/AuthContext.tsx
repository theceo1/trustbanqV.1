// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;  // Update this line
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface LoginResponseData {
  token: string;
  user: User;  // Add user information to the response
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);  // Update this line
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post<LoginResponseData>(
        'http://localhost:5001/api/auth/login',
        { email, password }
      );

      const { user, token } = response.data;
      setUser(user);  // Store the user object
      localStorage.setItem('token', token); // Store the token if needed
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      // Handle error if needed
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token'); // Clear token if needed
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
