# aDeal Network

A decentralized advertising network built on the Optimism L2 ecosystem that creates a transparent, user-centric, and efficient advertising model through decentralized identity (DID), on-chain attestations, and user-controlled data "wishlists."

## 🎯 Vision

aDeal Network connects users who wish to receive relevant advertising with advertisers seeking to reach engaged audiences. Users maintain self-sovereign control over their data and are rewarded for participation, while advertisers gain access to high-intent, verified user segments.

## 🏗️ Architecture

The aDeal network consists of four primary components:

### On-Chain Components (Optimism Smart Contracts)
- **Identity Contract**: Manages user and enterprise DIDs
- **Attestation Contract**: Interacts with Optimism's AttestationStation
- **Staking & Payments Contract**: Handles advertiser staking and user rewards
- **Reputation Contract**: Aggregates data for reputation scoring

### User-Facing dApp
- Web interface for wallet connection, DID management, wishlist creation, and ad viewing
- User feedback mechanisms and reward management

### Advertiser Portal
- Web interface for EID registration, campaign creation, and analytics
- Targeting parameter configuration and staking management

### Backend Services
- **Ad Matching Engine**: Scalable off-chain service for ad matching
- **API Layer**: RESTful endpoints for dApp and portal integration
- **Data Management**: Mutable data streams using decentralized storage

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- MetaMask wallet
- Optimism testnet configured

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/adeal-network.git
cd adeal-network

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development servers
npm run dev
```

### Development Commands

```bash
# Start all services
npm run dev

# Start specific services
npm run dev:contracts    # Smart contract development
npm run dev:frontend     # User dApp
npm run dev:portal       # Advertiser portal
npm run dev:backend      # Backend services

# Testing
npm run test
npm run test:contracts
npm run test:e2e

# Deployment
npm run deploy:testnet
npm run deploy:mainnet
```

## 📋 Development Roadmap

### Phase 1: Foundation (Benchmark) ✅
- [x] Technical Specifications & UI/UX Design
- [x] Core Smart Contracts (Identity, Staking/Payments)
- [x] Initial Backend Setup

### Phase 2: MVP Implementation (Critical) 🚧
- [ ] User DID & Wishlist (Modules 1 & 2)
- [ ] Advertiser Portal MVP (Module 3)
- [ ] Internal Testing

### Phase 3: Scaling & Enhancement (Critical) 📅
- [ ] Scalable Ad Matching Engine (Module 4)
- [ ] User Rewards & Reputation (Modules 5 & 6)
- [ ] Beta Testing

### Phase 4: Launch & Growth (Benchmark & Critical) 📅
- [ ] Full Deployment & Launch
- [ ] User Onboarding
- [ ] Monitoring & Iteration

## 🛠️ Tech Stack

- **Blockchain**: Optimism L2, Solidity
- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL, Redis
- **Storage**: IPFS, Ceramic Network
- **Testing**: Hardhat, Jest, Playwright
- **Deployment**: Docker, GitHub Actions

## 📚 Documentation

- [Technical Specification](./docs/TECHNICAL_SPEC.md)
- [API Documentation](./docs/API.md)
- [Smart Contract Documentation](./docs/CONTRACTS.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](./CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🔗 Links

- [Website](https://adeal.network)
- [Documentation](https://docs.adeal.network)
- [Discord](https://discord.gg/adeal)
- [Twitter](https://twitter.com/adealnetwork)

## 🙏 Acknowledgments

- Optimism Foundation for the L2 infrastructure
- AttestationStation for the attestation framework
- The Web3 community for inspiration and support 