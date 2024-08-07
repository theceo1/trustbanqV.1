import React from 'react';
import Layout from '../../components/layout/Layout';

const Mission: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-black mb-4">Our Mission</h1>
        
        <p>
        At TrustBank, our mission is to empower individuals globally by providing accessible financial services to one billion people. We believe that financial inclusion is key to a better future, and we are dedicated to making this vision a reality.
      </p>

      <p>
        Through innovative solutions and a commitment to transparency, we strive to build trust with our users and create a secure financial ecosystem for everyone.
      </p>
     
    </div>
    </Layout>
  );
};

export default Mission;
