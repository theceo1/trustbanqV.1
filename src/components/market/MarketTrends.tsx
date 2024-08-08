// src/components/market/MarketTrends.tsx
import React, { useState, useEffect } from 'react';
import { fetchMarketTrends, MarketTrend } from '../../services/api';

const MarketTrends: React.FC = () => {
  const [gainers, setGainers] = useState<MarketTrend[]>([]);
  const [losers, setLosers] = useState<MarketTrend[]>([]);

  useEffect(() => {
    const getMarketTrends = async () => {
      const { gainers, losers } = await fetchMarketTrends();
      setGainers(gainers);
      setLosers(losers);
    };

    getMarketTrends();
  }, []);

  return (
    <div className="bg-white dark:bg-black shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Market Trends</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Top Gainers</h3>
          <ul>
            {gainers.map((coin) => (
              <li key={coin.item.id} className="flex justify-between text-green-500">
                {coin.item.name}: {coin.item.price_change_percentage_24h.toFixed(2)}%
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Top Losers</h3>
          <ul>
            {losers.map((coin) => (
              <li key={coin.item.id} className="flex justify-between text-red-500">
                {coin.item.name}: {coin.item.price_change_percentage_24h.toFixed(2)}%
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MarketTrends;
