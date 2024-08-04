import React from 'react'
import Link from 'next/link'
import { MoonIcon } from '@heroicons/react/24/outline'

const Header: React.FC = () => {
  return (
    <header className="bg-secondary text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          trustBank
        </Link>
        <nav className="space-x-6">
          <Link href="/trade" className="hover:text-primary">Trade</Link>
          <Link href="/earn" className="hover:text-primary">Earn</Link>
          <Link href="/wallet" className="hover:text-primary">Wallet</Link>
          <Link href="/markets" className="hover:text-primary">Markets</Link>
          <Link href="/vision" className="hover:text-primary">Vision</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-700">
            <MoonIcon className="w-5 h-5" />
          </button>
          <button className="bg-white text-black px-4 py-2 rounded">Sign Up</button>
        </div>
      </div>
    </header>
  )
}

export default Header