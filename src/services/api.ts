import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const register = async (name: string, email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/register`, { name, email, password });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data;
};

export const requestPasswordReset = async (email: string) => {
  const response = await axios.post(`${API_URL}/auth/request-password-reset`, { email });
  return response.data;
};

export const resetPassword = async (token: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/reset-password`, { token, password });
  return response.data;
};
