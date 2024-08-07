import React from 'react';
import Layout from '../layout/Layout'; // Fix the import path
import BuySell from '../trade/BuySell'; // Fix the import path
import DepositWithdraw from '../trade/DepositWithdraw'; // Fix the import path
import SendReceive from '../trade/SendReceive'; // Fix the import path
import SwapCrypto from '../trade/SwapCrypto'; // Fix the import path

const Trade: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-black mb-6">Trade</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BuySell />
          <DepositWithdraw />
          <SendReceive />
          <SwapCrypto />
        </div>
      </div>
    </Layout>
  );
};

export default Trade;
