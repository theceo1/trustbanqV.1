import React from 'react';
import Layout from '../components/layout/Layout';
import Wallet from '../components/wallet/Wallet';
import BuySell from '../components/trade/BuySell';
import CryptoPriceTracker from '../components/common/CryptoPriceTracker';
import withSidebar from '@/components/layout/withSidebar';

const WalletPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Wallet</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Wallet />
            <div className="mt-8">
              <CryptoPriceTracker />
            </div>
          </div>
          <BuySell />
        </div>
      </div>
    </Layout>
  );
};

export default withSidebar(WalletPage);
