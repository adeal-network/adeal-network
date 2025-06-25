# aDeal Network

A decentralized advertising platform built on Optimism L2 that rewards users for viewing relevant advertisements while maintaining privacy and data sovereignty.

## 🎯 Overview

aDeal Network revolutionizes digital advertising by putting users in control of their data. Users create wishlists of their interests, receive relevant advertisements, and earn ADEAL tokens for their engagement. Advertisers get access to high-intent audiences while respecting user privacy.

## ✨ Key Features

### For Users
- **Self-Sovereign Identity**: Create and manage your DID
- **Data Control**: Build and manage your wishlist
- **Relevant Ads**: Receive ads based on your interests
- **Earn Rewards**: Get paid for sharing data and engagement
- **Privacy**: Control what data you share

### For Advertisers
- **Verified Audiences**: Access high-intent user segments
- **Transparent Targeting**: Know exactly who you're reaching
- **Performance Analytics**: Track campaign success
- **Cost Efficiency**: Pay only for relevant impressions

## 🏗️ Architecture

### Core Components
- **Smart Contracts**: Identity registry and staking/payments on Optimism L2
- **User dApp**: Next.js frontend for user interaction
- **Advertiser Portal**: Campaign management interface
- **Backend API**: Node.js/TypeScript REST API
- **Storage**: IPFS for decentralized data storage

### Technology Stack
- **Blockchain**: Optimism L2, Solidity, Hardhat
- **Frontend**: Next.js, React, Tailwind CSS, Wagmi
- **Backend**: Node.js, Express, TypeScript, PostgreSQL
- **Storage**: IPFS
- **DevOps**: Docker, GitHub Actions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker and Docker Compose
- MetaMask wallet
- Optimism testnet configured

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/adeal-network/adeal-network.git
   cd adeal-network
   ```

2. **Set up environment**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Start development environment**
   ```bash
   docker-compose up -d
   ```

4. **Install dependencies and start services**
   ```bash
   # Smart contracts
   cd contracts && npm install
   npm run compile
   npm run test
   
   # Frontend
   cd ../frontend && npm install
   npm run dev
   
   # Backend
   cd ../backend && npm install
   npm run dev
   
   # Advertiser portal
   cd ../advertiser-portal && npm install
   npm run dev
   ```

### Development URLs
- **User dApp**: http://localhost:3000
- **Advertiser Portal**: http://localhost:3002
- **Backend API**: http://localhost:3001
- **API Documentation**: http://localhost:3001/api-docs

## 📖 Documentation

- [Technical Specification](docs/TECHNICAL_SPEC.md)
- [Development Plan](docs/DEVELOPMENT_PLAN.md)
- [Project Summary](docs/PROJECT_SUMMARY.md)
- [Contributing Guidelines](CONTRIBUTING.md)

## 🔧 Development

### Smart Contracts
```bash
cd contracts
npm install
npm run compile
npm run test
npm run deploy:testnet
```

### Frontend Development
```bash
cd frontend
npm install
npm run dev
npm run build
npm run test
```

### Backend Development
```bash
cd backend
npm install
npm run dev
npm run test
npm run build
```

### Database Management
```bash
cd backend
npx prisma generate
npx prisma migrate dev
npx prisma studio
```

## 🧪 Testing

### Smart Contract Testing
```bash
cd contracts
npm run test
npm run coverage
```

### Frontend Testing
```bash
cd frontend
npm run test
npm run test:watch
npm run test:coverage
```

### Backend Testing
```bash
cd backend
npm run test
npm run test:watch
npm run test:coverage
```

### End-to-End Testing
```bash
npm run test:e2e
```

## 🚀 Deployment

### Smart Contracts
```bash
cd contracts
npm run deploy:mainnet
```

### Frontend
```bash
cd frontend
npm run build
# Deploy to Vercel/Netlify
```

### Backend
```bash
cd backend
npm run build
# Deploy to cloud provider
```

## 📊 Project Structure

```
adeal-network/
├── contracts/                 # Smart contracts
│   ├── contracts/            # Solidity contracts
│   ├── test/                 # Contract tests
│   ├── scripts/              # Deployment scripts
│   └── hardhat.config.js     # Hardhat configuration
├── frontend/                 # User dApp
│   ├── app/                  # Next.js app directory
│   ├── components/           # React components
│   ├── lib/                  # Utilities and hooks
│   └── public/               # Static assets
├── advertiser-portal/        # Advertiser portal
│   ├── app/                  # Next.js app directory
│   ├── components/           # React components
│   └── lib/                  # Utilities and hooks
├── backend/                  # Backend API
│   ├── src/                  # TypeScript source
│   ├── prisma/               # Database schema
│   └── tests/                # API tests
├── docs/                     # Documentation
├── .github/                  # GitHub Actions
├── docker-compose.yml        # Local development
└── package.json              # Root package.json
```

## 🔒 Security

### Smart Contract Security
- Comprehensive testing with 90%+ coverage
- External audits before mainnet deployment
- Access control and role-based permissions
- Emergency pause mechanisms

### Application Security
- JWT authentication
- Rate limiting
- Input validation
- HTTPS enforcement
- Regular security audits

### Data Privacy
- User data encryption
- GDPR compliance
- Data minimization
- User consent management

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Process
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

### Code Standards
- TypeScript for all new code
- ESLint and Prettier for formatting
- 90%+ test coverage
- Comprehensive documentation

## 📈 Roadmap

### Phase 1: Foundation ✅
- [x] Smart contract development
- [x] Basic frontend dApp
- [x] User DID management
- [x] Wishlist system

### Phase 2: MVP 🚧 (80% Complete)
- [x] User DID & Profile Management
  - [x] Wallet connection (RainbowKit)
  - [x] DID creation and management
  - [x] User profile interface
  - [x] Profile data storage
- [x] User Wishlist & Preferences
  - [x] Wishlist creation and management
  - [x] Preference categorization
  - [x] Privacy controls
  - [x] Data export functionality
- [x] Ad Display & Matching
  - [x] Ad display interface
  - [x] User feedback system
  - [x] Reward calculation
  - [x] Ad detail modal
- [x] Reward Dashboard
  - [x] Reward tracking interface
  - [x] Reward withdrawal system
  - [x] Reward history display
  - [x] Reward analytics
- [ ] Advertiser Portal (20% complete)
  - [ ] Advertiser registration
  - [ ] Campaign management
  - [ ] Ad creation tools
  - [ ] Basic analytics dashboard
- [ ] Backend Integration
  - [ ] API endpoints implementation
  - [ ] Database integration
  - [ ] Smart contract integration
  - [ ] End-to-end testing

### Phase 3: Growth 📅
- [ ] Advanced targeting
- [ ] Mobile app
- [ ] API marketplace
- [ ] Governance system

### Phase 4: Scale 📅
- [ ] Multi-chain support
- [ ] Enterprise features
- [ ] White-label solutions
- [ ] Advanced AI features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌐 Links

- **Website**: https://adeal.network
- **Documentation**: https://docs.adeal.network
- **Discord**: https://discord.gg/adeal
- **Twitter**: https://twitter.com/adealnetwork

## 🙏 Acknowledgments

- **Optimism Foundation** for L2 infrastructure
- **OpenZeppelin** for smart contract libraries
- **Web3 Community** for inspiration and support
- **Contributors** for their valuable contributions

---

*Building the future of decentralized advertising, one user at a time.* 🚀 