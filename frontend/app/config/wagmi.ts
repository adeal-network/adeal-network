import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { optimism, optimismGoerli } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'aDeal Network',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'your-project-id',
  chains: [
    optimism,
    optimismGoerli,
  ],
  ssr: true,
}) 