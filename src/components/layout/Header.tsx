//src/components/layout/Header.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { MoonIcon, SunIcon, ChevronDownIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../../context/ThemeContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-black text-white fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-2 py-2 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          trustBank
        </Link>
        
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
              onMouseEnter={() => setIsAboutOpen(true)}
              onMouseLeave={() => setIsAboutOpen(false)}
            >
              About
              <ChevronDownIcon className="ml-1 h-4 w-4" />
            </button>
            {isAboutOpen && (
              <div 
                className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                onMouseEnter={() => setIsAboutOpen(true)}
                onMouseLeave={() => setIsAboutOpen(false)}
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

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-white hover:text-green-600">
            {isMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>

        {/* Theme Toggle */}
        <div className="hidden md:flex items-center space-x-4">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-700">
            {theme === 'dark' ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
          </button>
          <button className="bg-red-500 text-white px-2 py-2 rounded hover:bg-teal-600">Sign Up</button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-black text-white space-y-2 px-2 py-4">
          <Link href="/dashboard" className="block hover:text-green-600">Dashboard</Link>
          <Link href="/trade" className="block hover:text-green-600">Trade</Link>
          <Link href="/wallet" className="block hover:text-green-600">Wallet</Link>
          <Link href="/markets" className="block hover:text-green-600">Markets</Link>
          <Link href="/calculator" className="block hover:text-green-600">Calculator</Link>
          <div className="relative inline-block text-left">
            <button 
              className="inline-flex items-center hover:text-green-600"
              onClick={() => setIsAboutOpen(!isAboutOpen)}
            >
              About
              <ChevronDownIcon className="ml-1 h-4 w-4" />
            </button>
            {isAboutOpen && (
              <div className="mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <Link href="/about/vision" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Vision</Link>
                  <Link href="/about/mission" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Mission</Link>
                  <Link href="/about/blog" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Blog</Link>
                </div>
              </div>
            )}
          </div>
          {/* Theme Toggle in Mobile Menu */}
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-700 mt-4">
            {theme === 'dark' ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;
