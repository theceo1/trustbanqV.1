import React, { useEffect, useState } from 'react';
import { fetchWatchlist, Coin } from '../../services/api';

const Watchlist: React.FC = () => {
  const [watchlist, setWatchlist] = useState<Coin[]>([]);

  useEffect(() => {
    const getWatchlist = async () => {
      const data = await fetchWatchlist();
      setWatchlist(data);
    };
    getWatchlist();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Watchlist</h2>
      <ul>
        {watchlist.map((coin) => (
          <li key={coin.id} className="flex justify-between">
            <span>{coin.name}</span>
            <span>${coin.current_price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Watchlist;
