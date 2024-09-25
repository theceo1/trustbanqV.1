import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export interface AuthResponse {
  token: string;
  access_token: string; // Add this line
  refresh_token?: string; // Add this line if you're using refresh tokens
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
    console.error('Full error object:', error);
    throw new Error(error.response?.data?.message || 'Unexpected error during registration');
  }
}

export function registerWithGoogle() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';
  window.location.href = `${API_URL}/auth/google`;
}

export async function loginUser(credentials: { email: string; password: string }) {
  try {
    console.log('Sending login request to:', `${API_URL}/auth/login`);
    console.log('Login credentials:', { email: credentials.email, password: '******' });
    const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, credentials);
    console.log('Login response:', response.data);
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      return response.data;
    } else {
      console.error('Login failed: No access token received');
      console.error('Full response:', response);
      throw new Error('Login failed: No access token received');
    }
  } catch (error: any) {
    console.error('Login error:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
      if (error.response.status === 401) {
        if (error.response.data.message === 'Email not confirmed') {
          throw new Error('Email not confirmed. Please check your inbox and confirm your email before logging in.');
        }
        throw new Error('Invalid email or password');
      }
    }
    throw new Error(error.response?.data?.message || 'Unexpected error during login');
  }
}

export function logout() {
  localStorage.removeItem('token');
  // Optionally, you can also make an API call to invalidate the token on the server
}
