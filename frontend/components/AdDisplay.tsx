'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'

interface Ad {
  id: string
  title: string
  description: string
  imageUrl: string
  advertiser: string
  advertiserReputation: number
  reward: number
  category: string
  isSponsored: boolean
}

export function AdDisplay() {
  const { address, isConnected } = useAccount()
  const [ads, setAds] = useState<Ad[]>([
    {
      id: '1',
      title: 'Premium Running Shoes',
      description: 'Get 20% off on the latest collection of running shoes. Perfect for your fitness goals!',
      imageUrl: 'https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Running+Shoes',
      advertiser: 'SportCo',
      advertiserReputation: 4.8,
      reward: 0.05,
      category: 'Sports & Fitness',
      isSponsored: true,
    },
    {
      id: '2',
      title: 'Organic Coffee Beans',
      description: 'Single-origin coffee beans from Ethiopia. Freshly roasted and delivered to your door.',
      imageUrl: 'https://via.placeholder.com/300x200/059669/FFFFFF?text=Coffee+Beans',
      advertiser: 'BeanMaster',
      advertiserReputation: 4.6,
      reward: 0.03,
      category: 'Food & Beverage',
      isSponsored: true,
    },
  ])
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null)

  const handleAdClick = (ad: Ad) => {
    setSelectedAd(ad)
    // TODO: Track ad click and distribute reward
    console.log('Ad clicked:', ad.id)
  }

  const handleAdFeedback = (adId: string, feedback: 'positive' | 'negative') => {
    // TODO: Send feedback to backend
    console.log('Ad feedback:', adId, feedback)
    
    // Remove ad from list after feedback
    setAds(ads.filter(ad => ad.id !== adId))
  }

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Personalized Advertisements
        </h2>
        <p className="text-gray-600 mb-8">
          Connect your wallet to see ads matched to your interests
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Your Personalized Ads
        </h2>
        
        <p className="text-gray-600 mb-6">
          These ads are matched to your wishlist preferences. Earn rewards for viewing and providing feedback.
        </p>

        {ads.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 mb-4">No ads available right now.</p>
            <p className="text-sm text-gray-400">Add more items to your wishlist to see relevant advertisements.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ads.map((ad) => (
              <div key={ad.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={ad.imageUrl}
                    alt={ad.title}
                    className="w-full h-48 object-cover"
                  />
                  {ad.isSponsored && (
                    <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded">
                      Sponsored
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                    +{ad.reward} ADEAL
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{ad.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{ad.description}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{ad.advertiser}</span>
                      <div className="flex items-center">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-sm text-gray-600 ml-1">{ad.advertiserReputation}</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {ad.category}
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAdClick(ad)}
                      className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm"
                    >
                      View Ad
                    </button>
                    <button
                      onClick={() => handleAdFeedback(ad.id, 'positive')}
                      className="px-3 py-2 text-green-600 hover:bg-green-50 rounded-md"
                    >
                      👍
                    </button>
                    <button
                      onClick={() => handleAdFeedback(ad.id, 'negative')}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                    >
                      👎
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Ad Details Modal */}
        {selectedAd && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{selectedAd.title}</h3>
                  <button
                    onClick={() => setSelectedAd(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                
                <img
                  src={selectedAd.imageUrl}
                  alt={selectedAd.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                
                <p className="text-gray-600 mb-4">{selectedAd.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Advertiser: {selectedAd.advertiser}</span>
                    <div className="flex items-center">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-sm text-gray-600 ml-1">{selectedAd.advertiserReputation}</span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {selectedAd.category}
                  </span>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg mb-4">
                  <p className="text-green-800 text-sm">
                    <strong>Earn {selectedAd.reward} ADEAL tokens</strong> for viewing this ad and providing feedback.
                  </p>
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      handleAdFeedback(selectedAd.id, 'positive')
                      setSelectedAd(null)
                    }}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
                  >
                    👍 Relevant
                  </button>
                  <button
                    onClick={() => {
                      handleAdFeedback(selectedAd.id, 'negative')
                      setSelectedAd(null)
                    }}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                  >
                    👎 Not Relevant
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <h3 className="text-sm font-medium text-blue-800 mb-2">About these ads</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Ads are matched to your wishlist preferences</li>
            <li>• Earn ADEAL tokens for viewing and providing feedback</li>
            <li>• Your feedback helps improve ad relevance</li>
            <li>• You can opt out of any advertiser at any time</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 