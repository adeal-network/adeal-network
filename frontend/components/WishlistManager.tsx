'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'

interface WishlistItem {
  id: string
  type: 'keyword' | 'product' | 'service' | 'category'
  content: string
  priority: 'low' | 'medium' | 'high'
  createdAt: Date
}

export function WishlistManager() {
  const { address, isConnected } = useAccount()
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [newItem, setNewItem] = useState('')
  const [selectedType, setSelectedType] = useState<'keyword' | 'product' | 'service' | 'category'>('keyword')
  const [selectedPriority, setSelectedPriority] = useState<'low' | 'medium' | 'high'>('medium')

  const addWishlistItem = () => {
    if (!newItem.trim()) return

    const item: WishlistItem = {
      id: Date.now().toString(),
      type: selectedType,
      content: newItem.trim(),
      priority: selectedPriority,
      createdAt: new Date(),
    }

    setWishlist([...wishlist, item])
    setNewItem('')
  }

  const removeWishlistItem = (id: string) => {
    setWishlist(wishlist.filter(item => item.id !== id))
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'keyword': return '🔍'
      case 'product': return '🛍️'
      case 'service': return '🔧'
      case 'category': return '📂'
      default: return '📝'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'low': return 'text-green-600 bg-green-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Manage Your Wishlist
        </h2>
        <p className="text-gray-600 mb-8">
          Connect your wallet to create and manage your advertising preferences
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Your Advertising Wishlist
        </h2>
        
        <p className="text-gray-600 mb-6">
          Add items to your wishlist to receive relevant advertisements. You control what you see and earn rewards for your preferences.
        </p>

        {/* Add New Item */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Item</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="e.g., running shoes, coffee, travel deals..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="keyword">Keyword</option>
                <option value="product">Product</option>
                <option value="service">Service</option>
                <option value="category">Category</option>
              </select>
            </div>
            
            <div>
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
          </div>
          
          <button
            onClick={addWishlistItem}
            disabled={!newItem.trim()}
            className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add to Wishlist
          </button>
        </div>

        {/* Wishlist Items */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Your Items ({wishlist.length})
          </h3>
          
          {wishlist.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No items in your wishlist yet. Add some items to start receiving relevant ads!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {wishlist.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{getTypeIcon(item.type)}</span>
                    <div>
                      <p className="font-medium text-gray-900">{item.content}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span className="capitalize">{item.type}</span>
                        <span>•</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                          {item.priority} priority
                        </span>
                        <span>•</span>
                        <span>{item.createdAt.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => removeWishlistItem(item.id)}
                    className="text-red-600 hover:text-red-800 p-2"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <h3 className="text-sm font-medium text-blue-800 mb-2">How it works</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Add items you're interested in to your wishlist</li>
            <li>• Receive relevant advertisements based on your preferences</li>
            <li>• Earn rewards for viewing and interacting with ads</li>
            <li>• You control your data and can remove items anytime</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 