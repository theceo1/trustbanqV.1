import React from 'react';
import Layout from './Layout';
import Sidebar from './Sidebar';

const withSidebar = (WrappedComponent: React.FC) => {
  const ComponentWithSidebar: React.FC = (props) => (
    <Layout>
      <Sidebar />
      <div className="ml-64 p-6">
        <WrappedComponent {...props} />
      </div>
    </Layout>
  );
  return ComponentWithSidebar;
};

export default withSidebar;
