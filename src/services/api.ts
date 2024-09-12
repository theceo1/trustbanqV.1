// src/services/api.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://trustbank-backend.vercel.app/api';

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Add a request interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const handleError = (error: any): never => {
  if (error.response) {
    console.error('API Error:', error.response.data.message || 'An error occurred');
    throw new Error(error.response.data.message || 'An error occurred');
  } else if (error.request) {
    console.error('No response received:', error.request);
    throw new Error('No response received from server');
  } else {
    console.error('Error:', error.message);
    throw error;
  }
};

// Define interfaces
export interface AuthResponse {
  token: string;
  message?: string;
}

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: null | {
    times: number;
    currency: string;
    percentage: number;
  };
  last_updated: string;
}

export interface ChartData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export interface MarketTrend {
  item: {
    id: string;
    coin_id: number;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    small: string;
    large: string;
    slug: string;
    price_btc: number;
    score: number;
    price_change_percentage_24h: number;
  };
}

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

export interface MarketStats {
  total_market_cap: { usd: number };
  total_volume: { usd: number };
  market_cap_percentage: { btc: number };
  active_cryptocurrencies: number;
}

export interface Balance {
  NGN: number;
  BTC: number;
  ETH: number;
}

// Login function
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post<AuthResponse>('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      return response.data;
    } else {
      throw new Error('Login failed: No token received');
    }
  } catch (error) {
    handleError(error); 
    return Promise.reject(error);
  }
};

// Register function
export const register = async (email: string, password: string, name: string): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post<AuthResponse>('/auth/register', { email, password, name });
    return response.data;
  } catch (error) {
    handleError(error); 
    return Promise.reject(error); 
  }
};

// Google login function
export const googleLogin = async (): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.get<AuthResponse>('/auth/google');
    return response.data;
  } catch (error) {
    handleError(error);
    return Promise.reject(error);
  }
};

// Request password reset function
export const requestPasswordReset = async (email: string): Promise<void> => {
  try {
    await axiosInstance.post('/users/request-password-reset', { email });
  } catch (error) {
    handleError(error); // Use the generic error handler
    return Promise.reject(error); // Ensure a rejected promise is returned
  }
};

// Reset password function
export const resetPassword = async (token: string, password: string): Promise<void> => {
  try {
    await axiosInstance.post('/users/reset-password', { token, password });
  } catch (error) {
    handleError(error); // Use the generic error handler
    return Promise.reject(error); // Ensure a rejected promise is returned
  }
};

// Fetch market overview function
export const fetchMarketOverview = async (): Promise<Coin[]> => {
  try {
    const response = await axiosInstance.get<Coin[]>('/coingecko/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
        sparkline: false,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error); // Use the generic error handler
    return Promise.reject(error); // Ensure a rejected promise is returned
  }
};

// Fetch balance function
export const fetchBalance = async (): Promise<Balance> => {
  try {
    const response = await axiosInstance.get<Balance>('/wallet/balance');
    return response.data;
  } catch (error) {
    handleError(error); // Use the generic error handler
    return Promise.reject(error); // Ensure a rejected promise is returned
  }
};

// Fetch Market Stats function
export const fetchMarketStats = async (): Promise<MarketStats> => {
  try {
    const response = await axiosInstance.get<MarketStats>('/market/stats'); // Adjust the endpoint as needed
    return response.data;
  } catch (error) {
    handleError(error); // Use the generic error handler
    return Promise.reject(error); // Ensure a rejected promise is returned
  }
};

// Define the expected structure of the market trends response
export interface MarketTrendsResponse {
  gainers: any[]; // Replace 'any' with a more specific type if available
  losers: any[]; // Replace 'any' with a more specific type if available
}

// Fetch Market Trends function
export const fetchMarketTrends = async (): Promise<MarketTrendsResponse> => {
  try {
    const response = await axiosInstance.get<MarketTrendsResponse>('/market/trends'); // Adjust the endpoint as needed
    return response.data;
  } catch (error) {
    handleError(error);
    return Promise.reject(error);
  }
};

// Define the expected structure of the news response
export interface NewsResponse {
  articles: NewsArticle[]; // Assuming NewsArticle is already defined
}

// Fetch Crypto News function
export const fetchCryptoNews = async (): Promise<NewsResponse> => {
  try {
    const response = await axiosInstance.get<NewsResponse>('/news/crypto'); // Adjust the endpoint as needed
    return response.data;
  } catch (error) {
    handleError(error);
    return Promise.reject(error);
  }
};

// Fetch Price Chart Data function
export const fetchPriceChartData = async (coinId: string): Promise<any> => {
  try {
    const response = await axiosInstance.get<any>(`/coins/${coinId}/chart-data`); // Adjust the endpoint as needed
    return response.data;
  } catch (error) {
    handleError(error); // Use the generic error handler
    return Promise.reject(error); // Ensure a rejected promise is returned
  }
};

// Fetch Watchlist function
export const fetchWatchlist = async (): Promise<any[]> => {
  try {
    const response = await axiosInstance.get<any[]>('/user/watchlist'); // Adjust the endpoint as needed
    return response.data;
  } catch (error) {
    handleError(error); // Use the generic error handler
    return Promise.reject(error); // Ensure a rejected promise is returned
  }
};
console.log('API_URL:', API_URL);
