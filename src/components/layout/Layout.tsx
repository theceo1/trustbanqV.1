// src/components/layout/Layout.tsx
import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      
      {/* Main content area */}
      <main className="flex-1 p-4">
        {children}
      </main>

      {/* Sidebar for mobile screens */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
          <div
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black opacity-50"
          />
        </div>
      )}
    </div>
  );
};

export default Layout;
