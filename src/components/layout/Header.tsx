import React from 'react'
import Link from 'next/link'
import { MoonIcon } from '@heroicons/react/24/outline'

const Header: React.FC = () => {
  return (
    <header className="bg-teal-900 text-white">
      <div className="container mx-auto px-2 py-2 flex justify-between items-center">
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
            <MoonIcon className="w-3 h-3" />
          </button>
          <button className="bg-white text-black px-2 py-2 rounded">Sign Up</button>
          <button className="bg-white text-black px-2 py-2 rounded">Sign In</button>

        </div>
      </div>
    </header>
  )
}

export default Header