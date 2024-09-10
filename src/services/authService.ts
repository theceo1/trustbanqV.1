import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export interface AuthResponse {
  token: string;
  user: any;
}

export async function registerUser(userData: { email: string; password: string }) {
  try {
    const response = await axios.post<AuthResponse>(`${API_URL}/auth/register`, userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      return response.data;
    } else {
      throw new Error('Registration failed: No token received');
    }
  } catch (error: any) {
    console.error('Registration error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Unexpected error during registration');
  }
}

export function registerWithGoogle() {
  window.location.href = `${API_URL}/auth/google`;
}

export async function loginUser(credentials: { email: string; password: string }) {
  try {
    const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      return response.data;
    } else {
      throw new Error('Login failed: No token received');
    }
  } catch (error: any) {
    console.error('Login error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Unexpected error during login');
  }
}

export function logout() {
  localStorage.removeItem('token');
  // Optionally, you can also make an API call to invalidate the token on the server
}
