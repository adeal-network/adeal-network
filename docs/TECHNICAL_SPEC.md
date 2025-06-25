# aDeal Network: Technical Specification & Development Plan

**Version:** 1.0  
**Date:** October 26, 2023

## 1. Project Overview

aDeal is a decentralized advertising network built on the Optimism L2 ecosystem. Its primary goal is to create a more transparent, user-centric, and efficient advertising model by leveraging decentralized identity (DID), on-chain attestations, and user-controlled data "wishlists."

The network will connect users who wish to receive relevant advertising with advertisers seeking to reach engaged audiences. Users are empowered with self-sovereign control over their data and are rewarded for their participation, while advertisers gain access to high-intent, verified user segments.

## 2. Core Concepts & Terminology

### Decentralized Identifier (DID)
A self-sovereign, globally unique identifier for entities.
- **User DID**: Represents an individual user on the network. Tied to their wallet (e.g., MetaMask).
- **Enterprise ID (EID)**: A DID for advertisers/agencies, used for verification and reputation.

### Attestation
A verifiable, signed statement made by one entity about another. We will leverage the Optimism AttestationStation or a compatible standard to verify claims (e.g., "User is interested in 'running shoes'," or "Advertiser X is a verified business").

### Wishlist
A user-controlled, mutable data stream containing their interests, preferences, and purchase intentions. This is the primary data source for ad matching. It can range from simple keywords ("Yirgacheffe coffee") to detailed plans ("4K HDR TV in next 6 months").

### Open Algorithms Framework
The core ad-matching logic of the aDeal network. While the initial algorithm will be developed by the core team, the framework is designed to be open for community contributions and improvements in the future, ensuring transparency.

### Utility Token
The native cryptographic token of the aDeal network, used for staking by advertisers, paying for ad placements, and rewarding users for sharing their data and engaging with ads.

## 3. System Architecture

The aDeal network consists of four primary components:

### On-Chain Components (Optimism Smart Contracts)

#### Identity Contract (DID/EID Registry)
- Manages the creation and resolution of user and enterprise identifiers
- Handles DID document updates and resolution
- Integrates with Optimism's AttestationStation for verification

#### Attestation Contract
- Interacts with Optimism's AttestationStation to create and verify attestations
- Manages attestation schemas and validation rules
- Provides attestation querying and verification endpoints

#### Staking & Payments Contract
- Handles advertiser staking (as a bond for good behavior)
- Manages ad placement payments and fee distribution
- Distributes user rewards based on engagement metrics
- Implements slashing mechanisms for malicious behavior

#### Reputation Contract
- Aggregates data (e.g., user feedback, campaign success) to create reputation scores
- Provides reputation querying and update mechanisms
- Implements reputation decay and recovery mechanisms

### User-Facing dApp (Frontend)
- Web interface allowing users to connect their wallet (MetaMask)
- DID creation and management interface
- Wishlist creation and management tools
- Ad viewing and interaction interface
- Feedback and reward management dashboard

### Advertiser Portal (Frontend)
- Web interface for advertisers to register for an EID
- Campaign creation and management tools
- Targeting parameter configuration
- Analytics and performance dashboard
- Staking and payment management

### aDeal Backend Service (Off-Chain)

#### Ad Matching Engine
- Core off-chain service that ingests user wishlists and advertiser campaign criteria
- Performs scalable and efficient ad matching using the Open Algorithms Framework
- Handles real-time matching and batch processing
- Provides match quality scoring and optimization

#### API Layer
- RESTful API endpoints for dApp and portal integration
- Authentication and authorization mechanisms
- Rate limiting and caching strategies
- Webhook support for real-time updates

#### Data Management Service
- Manages mutable data streams (wishlists)
- Integrates with decentralized storage solutions (IPFS)
- Handles data versioning and conflict resolution
- Provides data privacy and access control mechanisms

## 4. Detailed Feature Breakdown & Modules

### Module 1: Identity & Profile Management (User DID)

**Description**: The foundational module for user identity. Users must be able to create and manage a decentralized profile linked to their Optimism wallet.

**Key Components**:
- Frontend UI for wallet connection (MetaMask)
- Smart contract function for `createUserDID()`
- Backend logic to link DID with a profile (avatar, username)
- Integration with Optimism AttestationStation to create a basic "Verified User" attestation upon creation

**Acceptance Criteria**:
- Live demo on the aDeal website showing a user connecting a wallet and creating a profile
- Publicly accessible development documentation and code repository on GitHub
- Published test report on GitHub detailing successful DID creation and verification

### Module 2: User Wishlist & Preferences

**Description**: Implements the core user data primitive. This allows users to define what they are interested in.

**Key Components**:
- Frontend UI for creating, reading, updating, and deleting wishlist items
- Backend service to manage mutable data/event streams
- Mechanism to sign updates with the user's wallet to ensure authenticity
- Integration with decentralized storage for data persistence

**Acceptance Criteria**:
- Live demo on the aDeal website showing a user creating and modifying their wishlist in real-time
- Development documentation and code repository on GitHub
- Test report on GitHub demonstrating data persistence and user-controlled mutability

### Module 3: Advertiser Platform (EID, Ads & Staking)

**Description**: A comprehensive portal for advertisers to join the network and run campaigns.

**Key Components**:
- EID Registration: Frontend UI and smart contract function for businesses to register an Enterprise ID
- Ads Management Service: UI for creating ad content and defining targeting criteria
- Staking Service: Smart contract logic requiring advertisers to stake utility tokens
- Backend & Frontend Integration: A live business backend demo with a functional UI

**Acceptance Criteria**:
- Development documentation and code repository on GitHub
- A live demo of the aDeal business web backend showing EID registration, ad creation, and staking
- The deployed smart contract address for staking/payments is publicly available

### Module 4: Scalable Ad Matching Engine

**Description**: The core backend logic that matches advertiser needs with user wishlists. This must be scalable to handle many users and campaigns.

**Key Components**:
- A backend service that continuously processes active wishlists and ad campaigns
- An efficient algorithm to find the best matches
- An API endpoint for the user-facing dApp to request relevant ads
- SDK with Command-Line Interface (CLI) for verification and testing

**Acceptance Criteria**:
- Development documentation and code repository on GitHub
- An SDK and CLI tool allowing a developer to simulate a user and receive a matched ad
- Performance benchmarks demonstrating scalability

### Module 5: User-Facing Experience (Ad Delivery & Rewards)

**Description**: The user-facing components for viewing ads and being rewarded.

**Key Components**:
- Ad Landing Page/Section: A section in the user dApp where matched ads are displayed
- User Feedback Mechanism: Simple UI for users to provide feedback on ad relevance
- Utility Token for Rewards: A system to track user engagement and distribute token rewards

**Acceptance Criteria**:
- Live demo on the aDeal user frontend website showing ads being delivered and displayed
- The deployed smart contract address for the user rewards pool is publicly available
- Development documentation and code repository on GitHub

### Module 6: Reputation System (Dapp)

**Description**: A system to build trust by scoring advertisers based on their activity and user feedback.

**Key Components**:
- A smart contract to store and update reputation scores
- Backend logic to aggregate data and periodically update on-chain scores
- Frontend UI for users to view an advertiser's reputation score

**Acceptance Criteria**:
- Live demo on the aDeal frontend showing an advertiser's reputation score
- Deployed smart contract address for the reputation system
- Development documentation and code repository on GitHub

## 5. Development Roadmap & Phasing

### Phase 1: Foundation (Benchmark)
- [x] Complete Technical Specifications & UI/UX Design
- [x] Develop Core Smart Contracts
- [x] Setup Initial Backend

### Phase 2: MVP Implementation (Critical)
- [ ] User DID & Wishlist (Modules 1 & 2)
- [ ] Advertiser Portal MVP (Module 3)
- [ ] Internal Testing

### Phase 3: Scaling & Enhancement (Critical)
- [ ] Develop Scalable Ad Matching Engine (Module 4)
- [ ] Implement User Rewards & Reputation (Modules 5 & 6)
- [ ] Beta Testing

### Phase 4: Launch & Growth (Benchmark & Critical)
- [ ] Full Deployment & Launch
- [ ] Onboarding
- [ ] Monitoring & Iteration

## 6. Technical Implementation Details

### Smart Contract Architecture

#### Identity Contract
```solidity
contract IdentityRegistry {
    struct DID {
        address owner;
        string didDocument;
        uint256 createdAt;
        bool isActive;
    }
    
    mapping(address => DID) public userDIDs;
    mapping(address => DID) public enterpriseDIDs;
    
    function createUserDID(string memory didDocument) external;
    function createEnterpriseDID(string memory didDocument) external;
    function updateDIDDocument(address did, string memory newDocument) external;
    function deactivateDID(address did) external;
}
```

#### Staking & Payments Contract
```solidity
contract StakingAndPayments {
    struct Stake {
        uint256 amount;
        uint256 stakedAt;
        bool isActive;
    }
    
    mapping(address => Stake) public advertiserStakes;
    mapping(address => uint256) public userRewards;
    
    function stakeTokens(uint256 amount) external;
    function createCampaign(uint256 cost) external;
    function distributeReward(address user, uint256 amount) external;
    function withdrawRewards() external;
}
```

### Backend Architecture

#### API Endpoints
```
POST /api/users/did - Create user DID
GET /api/users/:did - Get user profile
PUT /api/users/:did/wishlist - Update user wishlist
GET /api/users/:did/ads - Get matched ads

POST /api/advertisers/eid - Create enterprise DID
POST /api/advertisers/campaigns - Create campaign
GET /api/advertisers/:eid/campaigns - Get advertiser campaigns

POST /api/matching/match - Request ad match
GET /api/matching/algorithm - Get matching algorithm info
```

#### Database Schema
```sql
-- Users table
CREATE TABLE users (
    did VARCHAR(255) PRIMARY KEY,
    wallet_address VARCHAR(42) UNIQUE NOT NULL,
    username VARCHAR(100),
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Wishlists table
CREATE TABLE wishlists (
    id SERIAL PRIMARY KEY,
    user_did VARCHAR(255) REFERENCES users(did),
    item_type VARCHAR(50) NOT NULL,
    content JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Advertisers table
CREATE TABLE advertisers (
    eid VARCHAR(255) PRIMARY KEY,
    wallet_address VARCHAR(42) UNIQUE NOT NULL,
    business_name VARCHAR(255) NOT NULL,
    verification_status VARCHAR(50) DEFAULT 'pending',
    reputation_score DECIMAL(5,2) DEFAULT 0.0
);

-- Campaigns table
CREATE TABLE campaigns (
    id SERIAL PRIMARY KEY,
    advertiser_eid VARCHAR(255) REFERENCES advertisers(eid),
    title VARCHAR(255) NOT NULL,
    content JSONB NOT NULL,
    targeting_criteria JSONB NOT NULL,
    budget DECIMAL(18,8) NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 7. Security Considerations

### Smart Contract Security
- Comprehensive testing with multiple frameworks (Hardhat, Foundry)
- External audits before mainnet deployment
- Access control and role-based permissions
- Emergency pause mechanisms
- Upgradeable contract patterns where appropriate

### Data Privacy
- User data encryption at rest and in transit
- Zero-knowledge proofs for sensitive data sharing
- GDPR compliance mechanisms
- User consent management
- Data retention policies

### Network Security
- Rate limiting and DDoS protection
- API authentication and authorization
- Input validation and sanitization
- Regular security audits and penetration testing

## 8. Performance Requirements

### Scalability Targets
- Support for 100,000+ concurrent users
- Sub-second ad matching response times
- 99.9% uptime SLA
- Horizontal scaling capabilities

### Monitoring & Observability
- Real-time performance metrics
- Error tracking and alerting
- User behavior analytics
- On-chain metrics dashboard

## 9. Testing Strategy

### Unit Testing
- Smart contract function testing
- API endpoint testing
- Frontend component testing

### Integration Testing
- End-to-end user flows
- Cross-service communication
- Blockchain integration testing

### Performance Testing
- Load testing for ad matching engine
- Stress testing for smart contracts
- Database performance testing

## 10. Deployment Strategy

### Environment Management
- Development environment
- Staging environment
- Production environment

### CI/CD Pipeline
- Automated testing on pull requests
- Automated deployment to staging
- Manual approval for production deployment
- Rollback mechanisms

### Infrastructure
- Containerized deployment with Docker
- Kubernetes orchestration
- Cloud-native architecture
- Multi-region deployment for global access 