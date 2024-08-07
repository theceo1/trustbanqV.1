import React from 'react'

const AccountBalance: React.FC = () => {
  return (
    <div className="bg-green-600 text-white p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Account Balance</h2>
      <div className="flex items-baseline">
        <span className="text-4xl font-bold">$12,345.67</span>
        <span className="ml-2 text-sm">USD</span>
      </div>
      <p className="text-sm mt-1">≈ 1.23 BTC</p>
      <button className="mt-2 w-full bg-black text-gray-100 px-2 py-2 rounded-md text-sm font-medium hover:bg-gray-800">
        Deposit
      </button>
    </div>
  )
}

export default AccountBalance