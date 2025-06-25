'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { useState } from 'react'
import { DIDRegistration } from '../components/DIDRegistration'
import { WishlistManager } from '../components/WishlistManager'
import { AdDisplay } from '../components/AdDisplay'
import { RewardDashboard } from '../components/RewardDashboard'

export default function Home() {
  const { isConnected, address } = useAccount()
  const [activeTab, setActiveTab] = useState('profile')

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to aDeal Network
            </h1>
            <p className="text-gray-600 mb-8">
              Connect your wallet to start earning rewards for relevant advertising
            </p>
            <ConnectButton />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                aDeal Network
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <ConnectButton />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'profile', name: 'Profile', icon: '👤' },
              { id: 'wishlist', name: 'Wishlist', icon: '📝' },
              { id: 'ads', name: 'Ads', icon: '📢' },
              { id: 'rewards', name: 'Rewards', icon: '💰' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {activeTab === 'profile' && <DIDRegistration />}
          {activeTab === 'wishlist' && <WishlistManager />}
          {activeTab === 'ads' && <AdDisplay />}
          {activeTab === 'rewards' && <RewardDashboard />}
        </div>
      </main>
    </div>
  )
} 