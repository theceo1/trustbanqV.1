import React, { useState } from 'react'
import Link from 'next/link'
import { MoonIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

const Header: React.FC = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <header className="bg-secondary text-white fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-2 py-2 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-teal-500 transition-colors">
          trustBank
        </Link>
        <nav className="space-x-6">
        <Link href="/dashboard" className="hover:text-primary">Dashboard</Link>
          <Link href="/trade" className="hover:text-primary">Trade</Link>
          <Link href="/wallet" className="hover:text-primary">Wallet</Link>
          <Link href="/markets" className="hover:text-primary">Markets</Link>
          <Link href="/calculator" className="hover:text-primary">Calculator</Link>
          <div className="relative inline-block text-left">
            <button 
              className="inline-flex items-center hover:text-primary"
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
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-700">
            <MoonIcon className="w-5 h-5" />
          </button>
          <button className="bg-teal-500 text-white px-2 py-2 rounded">Sign Up</button>
          <button className=" text-white px-2 py-2 rounded">Sign In</button>

        </div>
      </div>
    </header>
  )
}

export default Header