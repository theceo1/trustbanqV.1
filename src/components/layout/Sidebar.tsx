// src/components/layout/Sidebar.tsx
import React from 'react';
import Link from 'next/link';
import { HomeIcon, ChartBarIcon, WalletIcon, CurrencyDollarIcon, EyeIcon } from '@heroicons/react/24/outline';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-full w-60 bg-gray-800 text-white md:static md:translate-x-0 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out md:block`}
    >
      <nav>
        <ul className="space-y-4 p-4">
          <li>
            <Link href="/dashboard" className="flex items-center p-2 text-gray-200 hover:bg-green-600 rounded">
              <HomeIcon className="w-5 h-5 mr-2" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/trade" className="flex items-center p-2 text-gray-200 hover:bg-green-600 rounded">
              <ChartBarIcon className="w-5 h-5 mr-2" />
              Trade
            </Link>
          </li>
          <li>
            <Link href="/calculator" className="flex items-center p-2 text-gray-200 hover:bg-green-600 rounded">
              <CurrencyDollarIcon className="w-5 h-5 mr-2" />
              Calculator
            </Link>
          </li>
          <li>
            <Link href="/wallet" className="flex items-center p-2 text-gray-200 hover:bg-green-600 rounded">
              <WalletIcon className="w-5 h-5 mr-2" />
              Wallet
            </Link>
          </li>
          <li>
            <Link href="/markets" className="flex items-center p-2 text-gray-200 hover:bg-green-600 rounded">
              <ChartBarIcon className="w-5 h-5 mr-2" />
              Markets
            </Link>
          </li>
          <li>
            <Link href="/about/vision" className="flex items-center p-2 text-gray-200 hover:bg-green-600 rounded">
              <EyeIcon className="w-5 h-5 mr-2" />
              Vision
            </Link>
          </li>
          <li>
            <Link href="/about/blog" className="flex items-center p-2 text-gray-200 hover:bg-green-600 rounded">
              <EyeIcon className="w-5 h-5 mr-2" />
              Blog
            </Link>
          </li>
          <li>
            <Link href="/about/faq" className="flex items-center p-2 text-gray-200 hover:bg-green-600 rounded">
              <EyeIcon className="w-5 h-5 mr-2" />
              FAQ
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
