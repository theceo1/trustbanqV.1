import React, { useState } from 'react'

const Trade: React.FC = () => {
  const [action, setAction] = useState<'buy' | 'sell'>('buy')
  const [coin, setCoin] = useState('Bitcoin (BTC)')

  return (
    <div className="bg-white p-6 rounded-lg mt-6">
      <h2 className="text-xl font-semibold mb-4">Trade</h2>
      <div className="flex mb-4">
        <button
          className={`flex-1 py-2 ${action === 'buy' ? 'bg-primary text-white' : 'bg-gray-100'} rounded-l`}
          onClick={() => setAction('buy')}
        >
          Buy
        </button>
        <button
          className={`flex-1 py-2 ${action === 'sell' ? 'bg-primary text-white' : 'bg-gray-100'} rounded-r`}
          onClick={() => setAction('sell')}
        >
          Sell
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Coin</label>
        <select
          value={coin}
          onChange={(e) => setCoin(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option>Bitcoin (BTC)</option>
          <option>Ethereum (ETH)</option>
          <option>USDC</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
        <input type="number" className="w-full p-2 border rounded" placeholder="0.00" />
      </div>
      <button className="w-full bg-primary text-white py-2 rounded font-medium">
        {action === 'buy' ? 'Buy' : 'Sell'} {coin.split(' ')[0]}
      </button>
    </div>
  )
}

export default Trade