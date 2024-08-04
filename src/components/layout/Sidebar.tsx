import React from 'react'
import Link from 'next/link'
import { HomeIcon, ChartBarIcon, WalletIcon, CurrencyDollarIcon, EyeIcon } from '@heroicons/react/24/outline'

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-white w-64 min-h-screen p-4">
      <nav>
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
              <HomeIcon className="w-5 h-5 mr-2" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/trade" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
              <ChartBarIcon className="w-5 h-5 mr-2" />
              Trade
            </Link>
          </li>
          <li>
            <Link href="/earn" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
              <CurrencyDollarIcon className="w-5 h-5 mr-2" />
              Earn
            </Link>
          </li>
          <li>
            <Link href="/wallet" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
              <WalletIcon className="w-5 h-5 mr-2" />
              Wallet
            </Link>
          </li>
          <li>
            <Link href="/markets" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
              <ChartBarIcon className="w-5 h-5 mr-2" />
              Markets
            </Link>
          </li>
          <li>
            <Link href="/vision" className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded">
              <EyeIcon className="w-5 h-5 mr-2" />
              Vision
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar