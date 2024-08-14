// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface AuthContextType {
  user: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface LoginResponseData {
  token: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post<LoginResponseData>(
        'http://localhost:5001/api/auth/login',
        { email, password }
      );

      const { token } = response.data;
      setUser(token);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      // Display error notification if needed
    }
  };

  const logout = () => {
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
