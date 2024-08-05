import React, { ReactNode } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';

type LayoutProps = {
  children: ReactNode
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { logout, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex pt-16"> {/* Add padding-top here */}
        {/* <Sidebar /> */}
        <main className="flex-grow p-6">{children}</main>
      </div>
    </div>
  )
}

export default Layout