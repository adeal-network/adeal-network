'use client'

import { useState } from 'react'
import { useAccount, useContractWrite, useWaitForTransaction } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export function DIDRegistration() {
  const { address, isConnected } = useAccount()
  const [username, setUsername] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const createDIDDocument = () => {
    return JSON.stringify({
      '@context': 'https://www.w3.org/ns/did/v1',
      id: `did:adeal:${address}`,
      controller: address,
      verificationMethod: [
        {
          id: `did:adeal:${address}#controller`,
          type: 'EcdsaSecp256k1VerificationKey2019',
          controller: `did:adeal:${address}`,
          publicKeyHex: address,
        },
      ],
      service: [
        {
          id: `did:adeal:${address}#profile`,
          type: 'ProfileService',
          serviceEndpoint: {
            username,
            avatarUrl,
            createdAt: new Date().toISOString(),
          },
        },
      ],
    })
  }

  const handleCreateDID = async () => {
    if (!username.trim()) {
      alert('Please enter a username')
      return
    }

    setIsLoading(true)
    try {
      const didDocument = createDIDDocument()
      // TODO: Call smart contract to create DID
      console.log('Creating DID with document:', didDocument)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      alert('DID created successfully!')
    } catch (error) {
      console.error('Error creating DID:', error)
      alert('Failed to create DID')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Create Your Decentralized Identity
        </h2>
        <p className="text-gray-600 mb-8">
          Connect your wallet to create your DID and start earning rewards
        </p>
        <ConnectButton />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Create Your Decentralized Identity
        </h2>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-2">
              Avatar URL (Optional)
            </label>
            <input
              type="url"
              id="avatar"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="https://example.com/avatar.jpg"
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Your DID will be:</h3>
            <p className="text-sm text-gray-600 font-mono">
              {address ? `did:adeal:${address}` : 'Loading...'}
            </p>
          </div>

          <button
            onClick={handleCreateDID}
            disabled={isLoading || !username.trim()}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creating DID...' : 'Create DID'}
          </button>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <h3 className="text-sm font-medium text-blue-800 mb-2">What is a DID?</h3>
          <p className="text-sm text-blue-700">
            A Decentralized Identifier (DID) is a self-sovereign, globally unique identifier that you control. 
            It's tied to your wallet and allows you to manage your identity and data without relying on any central authority.
          </p>
        </div>
      </div>
    </div>
  )
} 