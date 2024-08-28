// src/services/api.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

interface AxiosErrorResponse {
  response?: {
    data: {
      message?: string;
    };
  };
  request?: unknown;
  message?: string;
}

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/auth/login', { email, password });
    return response.data;
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'isAxiosError' in error) {
      const axiosError = error as AxiosErrorResponse;
      if (axiosError.response) {
        console.error('Login error:', axiosError.response.data);
        throw new Error(axiosError.response.data.message || 'An error occurred during login');
      } else if (axiosError.request) {
        console.error('No response received:', axiosError.request);
        throw new Error('No response received from server');
      } else {
        console.error('Error setting up request:', axiosError.message);
        throw new Error('Error setting up request');
      }
    } else if (error instanceof Error) {
      console.error('Unexpected error:', error.message);
      throw new Error('An unexpected error occurred');
    } else {
      console.error('Unknown error:', error);
      throw new Error('An unknown error occurred');
    }
  }
};

export const requestPasswordReset = async (email: string) => {
  const response = await axios.post(`${API_URL}/users/request-password-reset`, { email });
  return response.data;
};

export const resetPassword = async (token: string, password: string) => {
  const response = await axios.post(`${API_URL}/users/reset-password`, { token, password });
  return response.data;
};

export interface Coin {
  id: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export const fetchMarketOverview = async () => {
  const response = await axios.get<Coin[]>(`https://api.coingecko.com/api/v3/coins/markets`, {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 10,
      page: 1,
      sparkline: false,
    },
  });
  return response.data;
};

export interface ChartData {
  prices: number[][];
}

export const fetchBitcoinPriceData = async () => {
  const response = await axios.get<ChartData>(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart`, {
    params: {
      vs_currency: 'usd',
      days: '30',
    },
  });
  return response.data;
};

export const fetchPriceChartData = async (coin: string) => {
  const response = await axios.get<ChartData>(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart`, {
    params: {
      vs_currency: 'usd',
      days: '30',
    },
  });
  return response.data;
};

export interface MarketTrend {
  item: {
    id: string;
    name: string;
    price_change_percentage_24h: number;
  };
}

export const fetchMarketTrends = async () => {
  const response = await axios.get<{ coins: MarketTrend[] }>(`https://api.coingecko.com/api/v3/search/trending`);
  const gainers = response.data.coins.filter((coin) => coin.item.price_change_percentage_24h > 0);
  const losers = response.data.coins.filter((coin) => coin.item.price_change_percentage_24h < 0);
  return { gainers, losers };
};

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
}

export const fetchCryptoNews = async () => {
  const response = await axios.get<{ articles: NewsArticle[] }>(`https://newsapi.org/v2/everything`, {
    params: {
      q: 'cryptocurrency',
      sortBy: 'publishedAt',
      apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY, // Use environment variable for API key
    },
  });
  return response.data;
};

export interface MarketStats {
  total_market_cap: { usd: number };
  total_volume: { usd: number };
  market_cap_percentage: { btc: number };
  active_cryptocurrencies: number;
}

export const fetchMarketStats = async () => {
  const response = await axios.get<{ data: MarketStats }>(`https://api.coingecko.com/api/v3/global`);
  return response.data.data;
};

export const fetchWatchlist = async () => {
  const response = await axios.get<Coin[]>(`https://api.coingecko.com/api/v3/coins/markets`, {
    params: {
      vs_currency: 'usd',
      ids: 'bitcoin,ethereum,litecoin',
    },
  });
  return response.data;
};

export interface Balance {
  NGN: number;
  BTC: number;
  ETH: number;
}

export const fetchBalance = async (): Promise<Balance> => {
  try {
    const response = await axiosInstance.get<Balance>('/wallet/balance');
    return response.data;
  } catch (error) {
    console.error('Error fetching balance:', error);
    throw error;
  }
};