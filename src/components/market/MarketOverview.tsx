import React, { useEffect, useState } from 'react';
import { fetchMarketOverview, Coin } from '../../services/api';

const MarketOverview: React.FC = () => {
  const [marketData, setMarketData] = useState<Coin[]>([]);

  useEffect(() => {
    const getMarketData = async () => {
      const data = await fetchMarketOverview();
      setMarketData(data);
    };
    getMarketData();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-black">Market Overview</h2>
      <ul>
        {marketData.map((coin) => (
          <li key={coin.id} className="flex justify-between">
            <span>{coin.name}</span>
            <span>${coin.current_price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MarketOverview;
