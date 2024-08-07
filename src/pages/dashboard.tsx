import React from 'react';
import { ArrowPathIcon, FunnelIcon } from '@heroicons/react/24/outline';
import AccountBalance from '@/components/dashboard/AccountBalance';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import MarketOverview from '@/components/dashboard/MarketOverview';
import Trade from '@/components/dashboard/Trade';
import CryptoPriceTracker from '@/components/common/CryptoPriceTracker';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import withSidebar from '@/components/layout/withSidebar';

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-2 py-2">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-black">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <button className="flex items-center px-2 py-2 bg-white dark:bg-gray-700 rounded shadow text-gray-800 dark:text-white">
            <ArrowPathIcon className="w-3 h-3 mr-1" />
            Refresh
          </button>
          <button className="flex items-center px-2 py-2 bg-white dark:bg-gray-700 rounded shadow text-gray-800 dark:text-white">
            <FunnelIcon className="w-3 h-3 mr-1" />
            Filter
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <AccountBalance />
          <div className="mt-6">
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
