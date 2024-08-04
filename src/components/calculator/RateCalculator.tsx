import React, { useState } from 'react';
import Image from 'next/image';

const RateCalculator: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('BTC');
  const [walletAction, setWalletAction] = useState('BUY');
  const [amount, setAmount] = useState('');

  const currencies = [
    { symbol: 'BTC', name: 'Bitcoin' },
    { symbol: 'ETH', name: 'Ethereum (ERC20)' },
    { symbol: 'USDT', name: 'USDT (ERC20)' },
    { symbol: 'USDC', name: 'USDC (TRC20)' },
  ];

  return (
    <div className="bg-blue-100 p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">CALCULATOR</h1>
      <h2 className="text-2lg font-semibold mb-8 text-gray-700">Market rates you can trust</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">CRYPTO | <span className="text-teal-500">TRUST</span></h3>
          
          <div className="mb-4">
            <p className="mb-2">Select Currency:</p>
            <div className="flex space-x-2">
              {currencies.map((currency) => (
                <button
                  key={currency.symbol}
                  className={`p-2 rounded ${selectedCurrency === currency.symbol ? 'bg-teal-500 text-white' : 'bg-gray-200'}`}
                  onClick={() => setSelectedCurrency(currency.symbol)}
                >
                  {currency.symbol}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-4">
            <p className="mb-2">Wallet Action:</p>
            <select
              className="w-full p-2 border rounded"
              value={walletAction}
              onChange={(e) => setWalletAction(e.target.value)}
            >
              <option value="BUY">BUY</option>
              <option value="SELL">SELL</option>
            </select>
          </div>
          
          <div className="mb-4">
            <p className="mb-2">Amount in USD</p>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <p className="text-sm text-gray-600 mt-1">$1 - NGN1640</p>
          </div>
          
          <div className="mb-4">
            <p className="text-2xl font-bold">0.00</p>
            <p className="text-sm text-gray-600">BTC 0.0000</p>
            <p className="text-xs text-gray-500 mt-2">NOTE: This is an estimated rate. Actual rate may differ</p>
          </div>
          
          <button className="w-full bg-teal-500 text-white py-2 rounded font-semibold">
            Calculate
          </button>
        </div>
        
        <div className="flex items-center justify-center">
          <Image
            src="/images/calculator-illustration.png"
            alt="Calculator Illustration"
            width={600}
            height={600}
          />
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600 mb-2">JOIN 300,000+ PEOPLE USING TRUSTBANK</p>
        <p className="text-2xl font-bold text-blue-800">Create a free account and get started</p>
      </div>
    </div>
  );
};

export default RateCalculator;