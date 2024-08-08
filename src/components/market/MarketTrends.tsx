import React, { useEffect, useState } from 'react';
import { fetchMarketTrends, MarketTrend } from '../../services/api';

const MarketTrends: React.FC = () => {
  const [trends, setTrends] = useState<{ gainers: MarketTrend[]; losers: MarketTrend[] }>({ gainers: [], losers: [] });

  useEffect(() => {
    const getTrends = async () => {
      const data = await fetchMarketTrends();
      setTrends(data);
    };
    getTrends();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Market Trends</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Top Gainers</h3>
          <ul>
            {trends.gainers.map((coin) => (
              <li key={coin.item.id} className="flex justify-between">
                <span>{coin.item.name}</span>
                <span className="text-green-500">{coin.item.price_change_percentage_24h.toFixed(2)}%</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Top Losers</h3>
          <ul>
            {trends.losers.map((coin) => (
              <li key={coin.item.id} className="flex justify-between">
                <span>{coin.item.name}</span>
                <span className="text-red-500">{coin.item.price_change_percentage_24h.toFixed(2)}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MarketTrends;
