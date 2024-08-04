import React from 'react'
import { ArrowPathIcon, FunnelIcon } from '@heroicons/react/24/outline'
import AccountBalance from '@/components/dashboard/AccountBalance'
import RecentTransactions from '@/components/dashboard/RecentTransactions'
import MarketOverview from '@/components/dashboard/MarketOverview'
import Trade from '@/components/dashboard/Trade'

const Dashboard: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="text-2lg flex items-center space-x-2">
          <button className="flex items-center px-3 py-2 bg-white rounded shadow">
            <ArrowPathIcon className="w-2 h-2 mr-2" />
            Refresh
          </button>
          <button className="flex items-center px-3 py-2 bg-white rounded shadow">
            <FunnelIcon className="w-2 h-2 mr-2" />
            Filter
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <AccountBalance />
          <RecentTransactions />
        </div>
        
        <div className="col-span-2">
          <MarketOverview />
          <Trade />
        </div>
      </div>
    </div>
  )
}

export default Dashboard