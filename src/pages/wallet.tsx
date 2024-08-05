import React from 'react';
import Head from 'next/head';
import Wallet from '../components/wallet/Wallet';
import CryptoPriceTracker from '../components/common/CryptoPriceTracker';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

const WalletPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>My Wallet - trustbanq</title>
        <meta name="description" content="Manage your cryptocurrency wallet" />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Wallet />
          <div>
            <CryptoPriceTracker />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProtectedRoute(WalletPage);