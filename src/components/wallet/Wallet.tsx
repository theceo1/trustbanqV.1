// src/components/wallet/Wallet.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { fetchBalance } from '../../services/api';

interface Balance {
  NGN: number;
  BTC: number;
  ETH: number;
}

const Wallet: React.FC = () => {
  const [balance, setBalance] = useState<Balance>({ NGN: 0, BTC: 0, ETH: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchBalanceData();
    } else {
      setLoading(false);
      setError('User not authenticated.');
    }
  }, [user]);

  const fetchBalanceData = async () => {
    try {
      const data = await fetchBalance();
      setBalance(data);
    } catch (error) {
      console.error('Failed to fetch balance', error);
      setError('Failed to load wallet data.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-600 dark:text-green-600">Loading wallet...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 dark:text-red-400">{error}</div>;
  }

  return (
    <div className="bg-white dark:bg-black shadow-lg rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">My Wallet</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-teal-600 rounded-lg p-4 text-white">
          <h3 className="text-lg font-semibold mb-2">Naira</h3>
          <p className="text-2xl font-bold">₦ {balance.NGN.toLocaleString()}</p>
        </div>
        <div className="bg-orange-500 rounded-lg p-4 text-white">
          <h3 className="text-lg font-semibold mb-2">Bitcoin</h3>
          <p className="text-2xl font-bold">{balance.BTC.toFixed(8)} BTC</p>
        </div>
        <div className="bg-blue-500 rounded-lg p-4 text-white">
          <h3 className="text-lg font-semibold mb-2">Ethereum</h3>
          <p className="text-2xl font-bold">{balance.ETH.toFixed(8)} ETH</p>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
