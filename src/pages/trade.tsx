import React from 'react';
import Head from 'next/head';
import BuySell from '../components/trade/BuySell';

const TradePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Trade Cryptocurrency - trustbanq</title>
        <meta name="description" content="Buy and sell cryptocurrency" />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <BuySell />
      </div>
    </>
  );
};

export default TradePage;