// src/components/layout/Sidebar.tsx
import React from 'react';
import Link from 'next/link';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Sidebar for mobile views */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-full bg-gray-900 text-white transform transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`}
      >
        <nav className="flex-1 p-4 pt-20">
          <ul>
            <li>
              <Link href="/dashboard" legacyBehavior>
                <a className="flex items-center p-2 hover:bg-gray-700 rounded">
                  <span className="w-5 h-5 mr-2">🏠</span> Dashboard
                </a>
              </Link>
            </li>
            <li>
              <Link href="/trade" legacyBehavior>
                <a className="flex items-center p-2 hover:bg-gray-700 rounded">
                  <span className="w-5 h-5 mr-2">📈</span> Trade
                </a>
              </Link>
            </li>
            <li>
              <Link href="/calculator" legacyBehavior>
                <a className="flex items-center p-2 hover:bg-gray-700 rounded">
                  <span className="w-5 h-5 mr-2">🔢</span> Calculator
                </a>
              </Link>
            </li>
            <li>
              <Link href="/wallet" legacyBehavior>
                <a className="flex items-center p-2 hover:bg-gray-700 rounded">
                  <span className="w-5 h-5 mr-2">💼</span> Wallet
                </a>
              </Link>
            </li>
            <li>
              <Link href="/markets" legacyBehavior>
                <a className="flex items-center p-2 hover:bg-gray-700 rounded">
                  <span className="w-5 h-5 mr-2">💹</span> Markets
                </a>
              </Link>
            </li>
            <li>
              <Link href="/vision" legacyBehavior>
                <a className="flex items-center p-2 hover:bg-gray-700 rounded">
                  <span className="w-5 h-5 mr-2">👁️</span> Vision
                </a>
              </Link>
            </li>
            <li>
              <Link href="/blog" legacyBehavior>
                <a className="flex items-center p-2 hover:bg-gray-700 rounded">
                  <span className="w-5 h-5 mr-2">📝</span> Blog
                </a>
              </Link>
            </li>
            <li>
              <Link href="/faq" legacyBehavior>
                <a className="flex items-center p-2 hover:bg-gray-700 rounded">
                  <span className="w-5 h-5 mr-2">❓</span> FAQ
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
