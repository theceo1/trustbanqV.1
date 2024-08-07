import React from 'react';
import Head from 'next/head';
import withSidebar from '@/components/layout/withSidebar';

const MarketsPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Markets - trustBank</title>
        <meta name="description" content="Cryptocurrency markets overview" />
      </Head>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-black mb-6">Markets</h1>
        {/* Add your markets content here */}
      </div>
    </>
  );
};

export default withSidebar(MarketsPage);
