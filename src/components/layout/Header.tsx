// src/components/layout/Header.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { MoonIcon, SunIcon, ChevronDownIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light'); // Example state, adjust as per your logic

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-black text-white">
      <nav className="flex items-center justify-between p-2">
        <Link href="/" className="text-lg font-bold"> {/* Redirect to homepage */}
          trustBank
        </Link>

        {/* Mobile Menu Icon */}
        <button className="md:hidden" onClick={toggleSidebar}>
          {isSidebarOpen ? <XMarkIcon className="w-4 h-4" /> : <Bars3Icon className="w-6 h-6" />}
        </button>

        {/* Desktop Menu */}
        <nav className="space-x-6 hidden md:flex">
          <Link href="/dashboard" className="hover:text-green-600">Dashboard</Link>
          <Link href="/trade" className="hover:text-green-600">Trade</Link>
          <Link href="/wallet" className="hover:text-green-600">Wallet</Link>
          <Link href="/markets" className="hover:text-green-600">Markets</Link>
          <Link href="/calculator" className="hover:text-green-600">Calculator</Link>
          <div className="relative inline-block text-left">
            <button 
              className="inline-flex items-center hover:text-green-600"
              onMouseEnter={() => setIsMenuOpen(true)}
              onMouseLeave={() => setIsMenuOpen(false)}
            >
              About
              <ChevronDownIcon className="ml-1 h-4 w-4" />
            </button>
            {isMenuOpen && (
              <div 
                className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                onMouseEnter={() => setIsMenuOpen(true)}
                onMouseLeave={() => setIsMenuOpen(false)}
              >
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <Link href="/about/vision" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Vision</Link>
                  <Link href="/about/mission" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Mission</Link>
                  <Link href="/about/blog" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Blog</Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Theme Toggle */}
        <div className="hidden md:flex items-center space-x-4">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-700">
            {theme === 'dark' ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
          </button>
          <button className="bg-red-500 text-white px-2 py-2 rounded hover:bg-teal-600">Sign Up</button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-black text-white space-y-2 px-2 py-4">
          <Link href="/dashboard" className="block hover:text-green-600">Dashboard</Link>
          <Link href="/trade" className="block hover:text-green-600">Trade</Link>
          <Link href="/wallet" className="block hover:text-green-600">Wallet</Link>
          <Link href="/markets" className="block hover:text-green-600">Markets</Link>
          <Link href="/calculator" className="block hover:text-green-600">Calculator</Link>
          <div className="block hover:text-green-600">About</div>
          <div className="ml-4 space-y-1">
            <Link href="/about/vision" className="block hover:text-green-600">Vision</Link>
            <Link href="/about/mission" className="block hover:text-green-600">Mission</Link>
            <Link href="/about/blog" className="block hover:text-green-600">Blog</Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
