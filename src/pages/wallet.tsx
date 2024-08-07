import React from 'react';
import Wallet from '../components/wallet/Wallet';
import BuySell from '../components/trade/BuySell';
import CryptoPriceTracker from '../components/common/CryptoPriceTracker';
import withSidebar from '@/components/layout/withSidebar';

const WalletPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-black mb-6">Wallet</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Wallet />
          <div className="mt-6">
            <CryptoPriceTracker />
          </div>
        </div>
        <BuySell />
      </div>
    </div>
  );
};

export default withSidebar(WalletPage);
