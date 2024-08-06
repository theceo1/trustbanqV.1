//src/services/api.ts
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

export const fetchBalance = async () => {
  const response = await axios.get(`${API_URL}/wallet/balance`);
  return response.data;
};

export const trade = async (action: 'buy' | 'sell', amount: number, currency: string) => {
  const response = await axios.post(`${API_URL}/trade`, { action, amount, currency });
  return response.data;
};
