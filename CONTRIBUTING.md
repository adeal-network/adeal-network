# Contributing to aDeal Network

Thank you for your interest in contributing to aDeal Network! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Guidelines](#contributing-guidelines)
- [Code Style](#code-style)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Feature Requests](#feature-requests)
- [Security](#security)

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for details.

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- Docker and Docker Compose (for local development)
- MetaMask or another Web3 wallet
- Optimism testnet configured in your wallet

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/adeal-network.git
   cd adeal-network
   ```
3. Add the upstream repository:
   ```bash
   git remote add upstream https://github.com/original-owner/adeal-network.git
   ```

## Development Setup

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install workspace dependencies
npm run install:all
```

### 2. Environment Configuration

```bash
# Copy environment template
cp env.example .env

# Edit .env with your configuration
# See env.example for required variables
```

### 3. Start Development Environment

```bash
# Start all services with Docker
docker-compose up -d

# Or start individual services
npm run dev:contracts    # Smart contracts
npm run dev:frontend     # User dApp
npm run dev:portal       # Advertiser portal
npm run dev:backend      # Backend API
```

### 4. Database Setup

```bash
# Generate Prisma client
cd backend && npm run db:generate

# Run migrations
npm run migrate
```

## Contributing Guidelines

### Branch Naming Convention

- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `hotfix/description` - Critical fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

### Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(frontend): add wallet connection component
fix(contracts): resolve reentrancy vulnerability
docs(readme): update installation instructions
```

### Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to documentation
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `priority: high` - High priority
- `priority: low` - Low priority

## Code Style

### Smart Contracts (Solidity)

- Use Solidity 0.8.20+
- Follow OpenZeppelin patterns
- Use NatSpec documentation
- Implement comprehensive error handling
- Write extensive tests

Example:
```solidity
/**
 * @title Example Contract
 * @dev Example contract with proper documentation
 */
contract ExampleContract {
    // Events
    event ExampleEvent(address indexed user, uint256 amount);

    // State variables
    mapping(address => uint256) public balances;

    /**
     * @dev Example function with proper documentation
     * @param amount Amount to deposit
     */
    function deposit(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        
        balances[msg.sender] += amount;
        emit ExampleEvent(msg.sender, amount);
    }
}
```

### Frontend (React/TypeScript)

- Use TypeScript for all new code
- Follow React best practices
- Use functional components with hooks
- Implement proper error boundaries
- Write unit tests for components

Example:
```typescript
import React from 'react';
import { useAccount, useConnect } from 'wagmi';

interface WalletConnectProps {
  onConnect?: (address: string) => void;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({ onConnect }) => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  const handleConnect = async () => {
    try {
      await connect({ connector: connectors[0] });
      onConnect?.(address || '');
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <button onClick={handleConnect} disabled={isConnected}>
      {isConnected ? 'Connected' : 'Connect Wallet'}
    </button>
  );
};
```

### Backend (Node.js/TypeScript)

- Use TypeScript for all code
- Follow RESTful API design principles
- Implement proper error handling
- Use dependency injection
- Write comprehensive tests

Example:
```typescript
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const userSchema = z.object({
  did: z.string().min(1),
  username: z.string().min(3).max(50),
});

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = userSchema.parse(req.body);
    
    const user = await userService.createUser(validatedData);
    
    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
```

## Testing

### Smart Contract Testing

```bash
# Run all tests
npm run test:contracts

# Run with coverage
npm run test:coverage --prefix contracts

# Run specific test file
npx hardhat test test/IdentityRegistry.test.js
```

### Frontend Testing

```bash
# Run all tests
npm run test:frontend

# Run with coverage
npm run test:coverage --prefix frontend

# Run specific test file
npm test -- --testPathPattern=WalletConnect.test.tsx
```

### Backend Testing

```bash
# Run all tests
npm run test:backend

# Run with coverage
npm run test:coverage --prefix backend

# Run specific test file
npm test -- --testPathPattern=auth.test.ts
```

### Integration Testing

```bash
# Run end-to-end tests
npm run test:e2e
```

## Pull Request Process

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes

- Write clean, well-documented code
- Add tests for new functionality
- Update documentation as needed
- Follow the code style guidelines

### 3. Test Your Changes

```bash
# Run all tests
npm test

# Run linting
npm run lint

# Type checking
npm run type-check
```

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat(scope): description of changes"
```

### 5. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

### 6. Pull Request Guidelines

- Provide a clear description of the changes
- Include any relevant issue numbers
- Add screenshots for UI changes
- Ensure all tests pass
- Request reviews from maintainers

### 7. Review Process

- All PRs require at least one review
- Address feedback and make requested changes
- Maintainers will merge after approval

## Reporting Bugs

### Before Submitting

1. Check existing issues to avoid duplicates
2. Try to reproduce the issue
3. Gather relevant information

### Bug Report Template

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
- OS: [e.g. macOS, Windows, Linux]
- Browser: [e.g. Chrome, Firefox, Safari]
- Version: [e.g. 22]
- Node.js version: [e.g. 18.0.0]

**Additional context**
Add any other context about the problem here.
```

## Feature Requests

### Feature Request Template

```markdown
**Is your feature request related to a problem? Please describe.**
A clear and concise description of what the problem is.

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
```

## Security

### Reporting Security Issues

If you discover a security vulnerability, please:

1. **DO NOT** create a public issue
2. Email security@adeal.network
3. Include detailed information about the vulnerability
4. Allow time for the team to respond and fix the issue

### Security Guidelines

- Never commit sensitive information (private keys, passwords, etc.)
- Use environment variables for configuration
- Validate all user inputs
- Implement proper authentication and authorization
- Follow security best practices for smart contracts

## Getting Help

- Check the [documentation](docs/)
- Search existing issues
- Join our [Discord](https://discord.gg/adeal)
- Email support@adeal.network

## Recognition

Contributors will be recognized in:
- Project README
- Release notes
- Contributor hall of fame
- Token rewards (for significant contributions)

Thank you for contributing to aDeal Network! 🚀 