import React from 'react';
import { ArrowPathIcon, FunnelIcon } from '@heroicons/react/24/outline';
import AccountBalance from '@/components/dashboard/AccountBalance';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import MarketOverview from '@/components/dashboard/MarketOverview';
import Trade from '@/components/dashboard/Trade';
import CryptoPriceTracker from '@/components/common/CryptoPriceTracker';
import withSidebar from '@/components/layout/withSidebar';

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button className="flex items-center px-4 py-2 bg-teal-500 text-white rounded shadow hover:bg-teal-600 transition">
            <ArrowPathIcon className="w-5 h-5 mr-2" />
            Refresh
          </button>
          <button className="flex items-center px-4 py-2 bg-teal-500 text-white rounded shadow hover:bg-teal-600 transition">
            <FunnelIcon className="w-5 h-5 mr-2" />
            Filter
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <AccountBalance />
          <div className="mt-8">
            <CryptoPriceTracker />
          </div>
          <RecentTransactions />
        </div>
        
        <div className="lg:col-span-2">
          <MarketOverview />
          <Trade />
        </div>
      </div>
    </div>
    
  );
};

export default withSidebar(Dashboard);
