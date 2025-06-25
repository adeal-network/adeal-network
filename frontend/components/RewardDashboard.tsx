'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'

interface Reward {
  id: string
  amount: number
  reason: string
  timestamp: Date
  status: 'pending' | 'claimed'
}

export function RewardDashboard() {
  const { address, isConnected } = useAccount()
  const [rewards, setRewards] = useState<Reward[]>([
    {
      id: '1',
      amount: 0.05,
      reason: 'Ad view reward - Running Shoes',
      timestamp: new Date(Date.now() - 3600000),
      status: 'pending',
    },
    {
      id: '2',
      amount: 0.03,
      reason: 'Ad view reward - Coffee Beans',
      timestamp: new Date(Date.now() - 7200000),
      status: 'pending',
    },
    {
      id: '3',
      amount: 0.02,
      reason: 'Positive feedback reward',
      timestamp: new Date(Date.now() - 86400000),
      status: 'claimed',
    },
  ])
  const [isWithdrawing, setIsWithdrawing] = useState(false)

  const totalPending = rewards
    .filter(r => r.status === 'pending')
    .reduce((sum, r) => sum + r.amount, 0)

  const totalClaimed = rewards
    .filter(r => r.status === 'claimed')
    .reduce((sum, r) => sum + r.amount, 0)

  const handleWithdraw = async () => {
    if (totalPending === 0) return

    setIsWithdrawing(true)
    try {
      // TODO: Call smart contract to withdraw rewards
      console.log('Withdrawing rewards:', totalPending)
      
      // Simulate transaction
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Update rewards status
      setRewards(rewards.map(r => 
        r.status === 'pending' ? { ...r, status: 'claimed' as const } : r
      ))
      
      alert('Rewards withdrawn successfully!')
    } catch (error) {
      console.error('Error withdrawing rewards:', error)
      alert('Failed to withdraw rewards')
    } finally {
      setIsWithdrawing(false)
    }
  }

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Reward Dashboard
        </h2>
        <p className="text-gray-600 mb-8">
          Connect your wallet to view and manage your rewards
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Your Rewards Dashboard
        </h2>
        
        <p className="text-gray-600 mb-6">
          Track your earnings from viewing ads and providing feedback. Withdraw your ADEAL tokens anytime.
        </p>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-green-50 p-6 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <span className="text-2xl">💰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-green-600">Pending Rewards</p>
                <p className="text-2xl font-bold text-green-900">{totalPending.toFixed(3)} ADEAL</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-blue-600">Total Claimed</p>
                <p className="text-2xl font-bold text-blue-900">{totalClaimed.toFixed(3)} ADEAL</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-2xl">📊</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-purple-600">Total Earnings</p>
                <p className="text-2xl font-bold text-purple-900">{(totalPending + totalClaimed).toFixed(3)} ADEAL</p>
              </div>
            </div>
          </div>
        </div>

        {/* Withdraw Button */}
        {totalPending > 0 && (
          <div className="mb-8">
            <button
              onClick={handleWithdraw}
              disabled={isWithdrawing}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isWithdrawing ? 'Withdrawing...' : `Withdraw ${totalPending.toFixed(3)} ADEAL`}
            </button>
          </div>
        )}

        {/* Rewards History */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Reward History
          </h3>
          
          {rewards.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No rewards yet. Start viewing ads to earn ADEAL tokens!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {rewards.map((reward) => (
                <div key={reward.id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${
                      reward.status === 'pending' ? 'bg-yellow-100' : 'bg-green-100'
                    }`}>
                      <span className="text-lg">
                        {reward.status === 'pending' ? '⏳' : '✅'}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{reward.reason}</p>
                      <p className="text-sm text-gray-500">
                        {reward.timestamp.toLocaleDateString()} at {reward.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">+{reward.amount.toFixed(3)} ADEAL</p>
                    <p className={`text-xs font-medium ${
                      reward.status === 'pending' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {reward.status === 'pending' ? 'Pending' : 'Claimed'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <h3 className="text-sm font-medium text-blue-800 mb-2">How rewards work</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Earn ADEAL tokens for viewing relevant advertisements</li>
            <li>• Get bonus rewards for providing feedback on ads</li>
            <li>• Rewards are automatically calculated and added to your balance</li>
            <li>• Withdraw your tokens anytime to your connected wallet</li>
            <li>• 1 ADEAL = $0.01 USD (approximate value)</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 