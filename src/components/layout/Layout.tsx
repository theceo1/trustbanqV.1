import React, { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';

type LayoutProps = {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { logout, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // Check if the current route is the home page
  const isHomePage = router.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex pt-16">
        {!isHomePage && <Sidebar />}
        <main className="flex-grow p-6">{children}</main>
      </div>
    </div>
  )
}

export default Layout;
