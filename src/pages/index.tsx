//src/pages/index.tsx
import React from 'react';
import Head from 'next/head';
import Layout from '../components/layout/Layout';

const Home: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>trustBank - Cryptocurrency Exchange</title>
        <meta name="description" content="Exchange fiat to cryptocurrency and vice-versa" />
      </Head>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-0">trustBank</h1>
        <p className="text-2lg mb-4 mt-0">TRADE | SPEND | <span className="text-green-600">EARN</span></p>

        <p className="text-lg mb-4">
          Secure and user-friendly cryptocurrency exchange you can <span className="text-green-600">trust</span>
        </p>
        <button className="bg-green-600 text-white px-2 py-2 rounded-md hover:bg-opacity-90">
          Get in there!!!
        </button>
      </div>
    </Layout>
  );
};

export default Home;
