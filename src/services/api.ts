// src/services/api.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Add a request interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

const handleError = (error: any) => {
  console.error('API Error:', error.response?.data?.message || error.message || 'An error occurred');
  throw new Error(error.response?.data?.message || 'An error occurred');
};

interface AxiosErrorResponse {
  response?: {
    data: {
      message?: string;
    };
  };
  request?: unknown;
  message?: string;
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

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const register = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/auth/register', { email, password });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const requestPasswordReset = async (email: string) => {
  try {
    const response = await axiosInstance.post('/users/request-password-reset', { email });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const resetPassword = async (token: string, password: string) => {
  try {
    const response = await axiosInstance.post('/users/reset-password', { token, password });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const fetchMarketOverview = async () => {
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
    return handleError(error);
  }
};


export const fetchBitcoinPriceData = async () => {
  try {
    const response = await axiosInstance.get<ChartData>('/coingecko/market_chart', {
      params: {
        id: 'bitcoin',
        vs_currency: 'usd',
        days: '30',
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const fetchPriceChartData = async (coin: string) => {
  try {
    const response = await axiosInstance.get<ChartData>('/coingecko/market_chart', {
      params: {
        id: coin,
        vs_currency: 'usd',
        days: '30',
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const fetchMarketTrends = async () => {
  try {
    const response = await axiosInstance.get<{ coins: MarketTrend[] }>('/coingecko/search/trending');
    const gainers = response.data.coins.filter((coin) => coin.item.price_change_percentage_24h > 0);
    const losers = response.data.coins.filter((coin) => coin.item.price_change_percentage_24h < 0);
    return { gainers, losers };
  } catch (error) {
    return handleError(error);
  }
};

export const fetchCryptoNews = async () => {
  try {
    const response = await axios.get<{ articles: NewsArticle[] }>('https://newsapi.org/v2/everything', {
      params: {
        q: 'cryptocurrency',
        sortBy: 'publishedAt',
        apiKey: process.env.NEXT_PUBLIC_NEWS_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const fetchMarketStats = async () => {
  try {
    const response = await axiosInstance.get<{ data: MarketStats }>('/coingecko/global');
    return response.data.data;
  } catch (error) {
    return handleError(error);
  }
};

export const fetchWatchlist = async () => {
  try {
    const response = await axiosInstance.get<Coin[]>('/coingecko/markets', {
      params: {
        vs_currency: 'usd',
        ids: 'bitcoin,ethereum,tether',
      },
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const fetchBalance = async (): Promise<Balance> => {
  try {
    const response = await axiosInstance.get<Balance>('/wallet/balance');
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};