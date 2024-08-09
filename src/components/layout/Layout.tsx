// src/components/layout/Layout.tsx
import React from 'react';
import Header from './Header';

interface LayoutProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, toggleSidebar, isSidebarOpen }) => {
  return (
    <div>
      <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
