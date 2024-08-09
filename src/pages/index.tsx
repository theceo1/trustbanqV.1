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
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">trustBank</h1>
          <p className="text-2xl mb-8">TRADE | SPEND | <span className="text-green-600">EARN</span></p>
          <p className="text-lg mb-6">
            Secure and user-friendly cryptocurrency exchange you can <span className="text-green-600">trust</span>.
          </p>
          <button className="bg-green-600 text-white px-6 py-3 rounded-md text-lg hover:bg-opacity-90">
            Get Started
          </button>
        </section>

        {/* Features Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Our Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold mb-4">Secure Transactions</h3>
              <p className="text-gray-700">Experience fast, secure, and transparent transactions on our platform.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold mb-4">Real-Time Market Data</h3>
              <p className="text-gray-700">Stay ahead with the latest market trends and live price updates.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold mb-4">User-Friendly Interface</h3>
              <p className="text-gray-700">Our intuitive interface makes trading simple, even for beginners.</p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                "trustBank has made my crypto trading experience smooth and secure. I couldn't ask for a better platform."
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">- Jane Doe</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                "The real-time market data and intuitive design have helped me make informed decisions quickly."
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">- John Smith</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                "I trust trustBank for its top-notch security and reliable service."
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">- Sarah Johnson</p>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="bg-gray-800 text-white py-8 mt-12">
          <div className="container mx-auto text-center">
            <p className="mb-4">&copy; 2024 trustBank. All rights reserved.</p>
            <div className="flex justify-center space-x-6">
              <a href="/about" className="hover:underline">About Us</a>
              <a href="/terms" className="hover:underline">Terms of Service</a>
              <a href="/privacy" className="hover:underline">Privacy Policy</a>
              <a href="/contact" className="hover:underline">Contact Us</a>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
};

export default Home;
