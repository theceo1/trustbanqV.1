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

export const fetchBalance = async () => {
  try {
    const response = await axios.get(`${API_URL}/wallet/balance`, {
      withCredentials: true, // Include cookies if your backend requires them for authentication
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching balance:', error);
    throw error; // Rethrow the error so it can be caught in the component
  }
};