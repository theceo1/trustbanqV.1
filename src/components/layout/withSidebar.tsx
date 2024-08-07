import React from 'react';
import Layout from './Layout';
import Sidebar from './Sidebar';

const withSidebar = (WrappedComponent: React.FC) => {
  const ComponentWithSidebar: React.FC = (props) => (
    <Layout>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow">
          <WrappedComponent {...props} />
        </div>
      </div>
    </Layout>
  );
  return ComponentWithSidebar;
};

export default withSidebar;
