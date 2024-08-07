import React from 'react';
import Layout from '../../components/layout/Layout';

const Blog: React.FC = () => {
  return (
    <Layout>
      {/* <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-black mb-6">Blog</h1>
        <p>Blog content coming soon...</p>
        <p>
        Welcome to the trustBank Blog. Here, we share the latest updates on the crypto market, insights into the financial industry, and news about our company&apos;s activities and initiatives.
      </p>
      </div> */}

      <div className="container mx-auto py-2 px-4 text-black">
      <h1 className="text-3xl font-bold mb-4">trustBank Blog</h1>
      <p className="text-black mb-10">
      Welcome to the trustBank blog! Here, you&apos;ll find the latest updates on the crypto market, as well as news and insights from our company. Stay tuned for expert analysis, company announcements, and tips to help you achieve the most in your financial journey.
      </p>
      <div className="space-y-4">
      <p>
        Become the bank you trust. Our mission is to empower individuals with secure, transparent, and accessible financial tools that help them achieve their financial goals.
      </p>
        <article>
          <h2 className="text-2xl font-semibold mb-2">The Future of Cryptocurrency</h2>
          <p className='mb-6'>
            Stay updated with the latest trends and predictions for the future of cryptocurrency. Our experts share their insights on how the market is evolving and what to expect in the coming years.
          </p>
        </article>
        <article>
          <h2 className="text-2xl font-semibold mb-2">trustBank Initiatives</h2>
          <p className='mb-60'>
            Learn about the latest initiatives and projects we are working on to improve our services and support our users. From new features to community events, stay informed about what&apos;s happening at TrustBank.
          </p>
        </article>
        
        <article>
            <p>
                Welcome to the TrustBank blog! Here, you&apos;ll find the latest updates on the crypto market, as well as news and insights from our company. Stay tuned for expert analysis, company announcements, and tips to help you make the most of your financial journey.
            </p>
        </article>
      </div>
    </div>

    </Layout>
  );
};

export default Blog;
