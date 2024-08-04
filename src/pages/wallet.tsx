import React from 'react';
import Head from 'next/head';
import Wallet from '../components/wallet/Wallet';

const WalletPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>My Wallet - trustbanq</title>
        <meta name="description" content="Manage your cryptocurrency wallet" />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <Wallet />
      </div>
    </>
  );
};

export default WalletPage;