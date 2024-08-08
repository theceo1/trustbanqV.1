import React, { ReactNode } from 'react';
import Header from './Header';

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex pt-2"> {/* Add padding-top here */}
        <main className="pl-2 pt-2 flex-grow">{children}</main> {/* Adjust margin-left */}
      </div>
    </div>
  );
};

export default Layout;
