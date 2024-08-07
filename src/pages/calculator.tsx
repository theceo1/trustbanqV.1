import React from 'react';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import RateCalculator from '../components/calculator/RateCalculator';

const CalculatorPage: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>Rate Calculator - trustbanq</title>
        <meta name="description" content="Calculate cryptocurrency exchange rates" />
      </Head>
      <div className="container mx-auto px-4 py-2">
        <RateCalculator />
      </div>
    </Layout>
  );
};

export default CalculatorPage;
