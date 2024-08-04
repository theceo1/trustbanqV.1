import React, { useState } from 'react';
import { CurrencyDollarIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

type CryptoBalance = {
  currency: string;
  amount: number;
  usdValue: number;
};

const Wallet: React.FC = () => {
  const [balances, setBalances] = useState<CryptoBalance[]>([
    { currency: 'BTC', amount: 0.5, usdValue: 20000 },
    { currency: 'ETH', amount: 2.5, usdValue: 5000 },
    { currency: 'USDT', amount: 1000, usdValue: 1000 },
  ]);

  const totalUsdValue = balances.reduce((total, balance) => total + balance.usdValue, 0);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Wallet</h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Total Balance</h2>
        <p className="text-3xl font-bold">${totalUsdValue.toLocaleString()}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {balances.map((balance) => (
          <div key={balance.currency} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-semibold">{balance.currency}</span>
              <CurrencyDollarIcon className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-2xl font-bold mb-1">{balance.amount}</p>
            <p className="text-gray-600">${balance.usdValue.toLocaleString()}</p>
            <div className="mt-4 flex space-x-2">
              <button className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md flex items-center justify-center">
                <ArrowUpIcon className="w-4 h-4 mr-2" />
                Deposit
              </button>
              <button className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md flex items-center justify-center">
                <ArrowDownIcon className="w-4 h-4 mr-2" />
                Withdraw
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wallet;