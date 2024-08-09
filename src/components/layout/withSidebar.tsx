// src/components/layout/withSidebar.tsx
import React from 'react';
import Sidebar from './Sidebar';
import Layout from './Layout';

const withSidebar = (WrappedComponent: React.FC) => {
  const ComponentWithSidebar: React.FC = (props) => (
    <Layout>
      <div className="flex">
        {/* Sidebar rendered here */}
        <Sidebar isOpen={true} />
        {/* Main content area */}
        <div className="flex-grow">
          <WrappedComponent {...props} />
        </div>
      </div>
    </Layout>
  );

  return ComponentWithSidebar;
};

export default withSidebar;
