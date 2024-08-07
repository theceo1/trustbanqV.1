import React from 'react';
import Head from 'next/head';
import BuySell from '../components/trade/BuySell';
import DepositWithdraw from '../components/trade/DepositWithdraw';
import SendReceive from '../components/trade/SendReceive';
import SwapCrypto from '../components/trade/SwapCrypto';
import withSidebar from '@/components/layout/withSidebar';

const TradePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Trade Cryptocurrency - trustBank</title>
        <meta name="description" content="Buy and sell cryptocurrency" />
      </Head>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-black mb-6">Trade</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BuySell />
          <DepositWithdraw />
          <SendReceive />
          <SwapCrypto />
        </div>
      </div>
    </>
  );
};

export default withSidebar(TradePage);
