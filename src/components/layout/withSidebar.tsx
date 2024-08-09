// src/components/layout/withSidebar.tsx
import React, { useState, useEffect, useRef } from 'react';
import Layout from './Layout';
import Sidebar from './Sidebar';

const withSidebar = (WrappedComponent: React.FC) => {
  const ComponentWithSidebar: React.FC = (props) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    useEffect(() => {
      if (isSidebarOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      } else {
        document.removeEventListener('mousedown', handleClickOutside);
      }
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isSidebarOpen]);

    return (
      <Layout toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}>
        {/* Menu Button - Visible only on smaller screens */}
        <button
          onClick={toggleSidebar}
          className="sm:block md:hidden p-2 bg-gray-700 text-white"
        >
          Menu
        </button>

        {/* Background Overlay - Appears when sidebar is open */}
        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
        )}

        {/* Sidebar - Smooth transition, responsive and closable */}
        <div
          ref={sidebarRef}
          className={`fixed z-50 top-0 left-0 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } sm:w-64 w-3/4`}
        >
          <Sidebar isOpen={isSidebarOpen} />
        </div>

        {/* Main Content */}
        <div className={`p-6 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-2'}`}>
          <WrappedComponent {...props} />
        </div>
      </Layout>
    );
  };

  return ComponentWithSidebar;
};

export default withSidebar;
