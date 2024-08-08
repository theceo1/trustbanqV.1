import React, { useEffect, useState } from 'react';
import { fetchMarketStats } from '../../services/api';

const MarketStats: React.FC = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const getStats = async () => {
      const data = await fetchMarketStats();
      setStats(data);
    };
    getStats();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Market Stats</h2>
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Total Market Cap</h3>
            <p className="text-2xl font-bold">${stats.total_market_cap.usd.toLocaleString()}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">24h Volume</h3>
            <p className="text-2xl font-bold">${stats.total_volume.usd.toLocaleString()}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Bitcoin Dominance</h3>
            <p className="text-2xl font-bold">{stats.market_cap_percentage.btc.toFixed(2)}%</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Active Cryptocurrencies</h3>
            <p className="text-2xl font-bold">{stats.active_cryptocurrencies}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketStats;
