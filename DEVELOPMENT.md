# Lykos Wallet - Development Guide

## Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs on `http://localhost:3000`

### 2. Frontend Setup

```bash
cd frontend
npm install
npx expo start
```

Then:

- Press `i` for iOS
- Press `a` for Android
- Scan QR for physical device

## Architecture Overview

### Frontend Structure

```
frontend/src/
├── api/                    # API Client
│   └── client.ts          # HTTP client with all endpoints
│
├── components/             # Reusable UI Components
│   ├── Button.tsx         # Custom button with variants
│   ├── Card.tsx           # Card container component
│   ├── Input.tsx          # Form input with validation
│   ├── Tag.tsx            # Status/label tags
│   └── Badge.tsx          # Notification badges
│
├── navigation/             # Navigation Configuration
│   ├── types.ts           # Navigation type definitions
│   └── RootNavigator.tsx  # Main navigation setup
│
├── screens/                # All App Screens
│   ├── auth/              # Authentication Flow
│   │   ├── WelcomeScreen.tsx
│   │   ├── SignInScreen.tsx
│   │   ├── CreateWalletScreen.tsx
│   │   └── TwoFASetupScreen.tsx
│   │
│   └── home/              # Main App Screens
│       └── HomeScreen.tsx # Portfolio & transactions
│
├── store/                  # Zustand State Management
│   ├── authStore.ts       # User authentication
│   ├── walletStore.ts     # Wallets & transactions
│   └── settingsStore.ts   # App settings
│
├── theme/                  # Design System
│   ├── colors.ts          # Light & dark themes
│   └── ThemeProvider.tsx  # Theme context provider
│
└── types/                  # TypeScript Definitions
    └── index.ts           # All type definitions
```

### Backend Structure

```
backend/src/
├── controllers/            # Request Handlers
│   ├── authController.ts
│   ├── walletController.ts
│   ├── transactionController.ts
│   ├── swapController.ts
│   ├── bridgeController.ts
│   ├── securityController.ts
│   └── rewardsController.ts
│
├── services/               # Business Logic
│   └── dataService.ts     # Mock data & operations
│
├── routes/                 # API Routes
│   └── index.ts           # All endpoint definitions
│
├── types.ts                # TypeScript types
└── index.ts                # Server entry point
```

## Key Features Implemented

### ✅ Authentication Flow

- Welcome screen with social login options
- Email/password sign-in
- Wallet creation workflow
- Optional 2FA setup

### ✅ Theme System

- Light/Dark mode support
- iOS-inspired design
- Consistent spacing & typography
- Reusable design tokens

### ✅ State Management

- Zustand for lightweight state
- Persistent auth state
- Settings persistence
- Wallet & transaction management

### ✅ Navigation

- Stack navigation for auth
- Bottom tabs for main app
- Nested navigators for features
- Type-safe navigation

### ✅ Backend API

- RESTful endpoints
- Mock authentication
- In-memory data storage
- All wallet operations

### ✅ Home Screen

- Portfolio overview
- Multi-chain wallet cards
- Quick action buttons
- Recent transactions list
- Pro mode support (UI ready)

## API Endpoints Reference

### Authentication

```typescript
POST /auth/social-login
Body: { provider: 'google' | 'apple' | 'email', email?, password? }
Response: { user: User, token: string }
```

### Wallets

```typescript
GET /wallets
Headers: { x-user-id: string }
Response: Wallet[]

GET /wallets/:id/transactions
Response: Transaction[]
```

### Transactions

```typescript
POST / transactions / send;
Body: {
  fromWalletId, to, token, amount;
}
Response: Transaction;
```

### Swap (Euclid Protocol Ready)

```typescript
POST / swap;
Body: {
  fromToken, toToken, amount, chainId;
}
Response: SwapQuote;

POST / swap / execute;
Body: {
  fromToken, toToken, amount, chainId;
}
Response: Transaction;
```

### Bridge

```typescript
POST / bridge;
Body: {
  fromChain, toChain, token, amount;
}
Response: BridgeQuote;

POST / bridge / execute;
Body: {
  fromChain, toChain, token, amount;
}
Response: Transaction;
```

### Security

```typescript
POST /security/scan
Body: { transactionIds: string[] }
Response: SecurityScanResult[]

POST /recovery/request
Body: { description, contactEmail }
Response: RecoveryRequest
```

### Rewards

```typescript
GET /rewards
Headers: { x-user-id: string }
Response: UserRewards
```

## Design System

### Colors

```typescript
// Light Theme
primary: "#007AFF";
secondary: "#5856D6";
success: "#34C759";
warning: "#FF9500";
error: "#FF3B30";
background: "#FFFFFF";
text: "#000000";

// Dark Theme
primary: "#0A84FF";
secondary: "#5E5CE6";
success: "#30D158";
warning: "#FF9F0A";
error: "#FF453A";
background: "#000000";
text: "#FFFFFF";
```

### Spacing Scale

```typescript
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
xxl: 48px
```

### Border Radius

```typescript
sm: 8px
md: 12px
lg: 16px
xl: 24px
full: 9999px
```

### Typography

```typescript
xs: 12px
sm: 14px
md: 16px
lg: 20px
xl: 24px
xxl: 32px
xxxl: 40px
```

## State Management

### Auth Store

```typescript
{
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: (user, token) => Promise<void>
  logout: () => Promise<void>
  updateUser: (updates) => void
  loadAuth: () => Promise<void>
}
```

### Wallet Store

```typescript
{
  wallets: Wallet[]
  selectedWallet: Wallet | null
  transactions: Transaction[]
  isLoading: boolean
  setWallets: (wallets) => void
  setSelectedWallet: (wallet) => void
  setTransactions: (transactions) => void
  addTransaction: (transaction) => void
  updateTransaction: (id, updates) => void
}
```

### Settings Store

```typescript
{
  themeMode: "light" | "dark" | "system";
  currency: "USD" | "EUR" | "GBP";
  language: "en" | "es" | "fr";
  setThemeMode: (mode) => Promise<void>;
  setCurrency: (currency) => Promise<void>;
  setLanguage: (language) => Promise<void>;
  loadSettings: () => Promise<void>;
}
```

## Mock Data

The backend generates realistic mock data for:

- **3 wallets**: Ethereum, Bitcoin, Polygon
- **Multiple tokens** per wallet
- **Transaction history** with various types
- **Security scan results** with risk levels
- **Rewards & EXP** tracking system

All data is stored in-memory and resets when the server restarts.

## Next Steps

### To Complete the App:

1. **Implement remaining screens**:

   - Portfolio detail view
   - Send/Receive flows
   - Swap/Bridge interfaces
   - Security center
   - Profile & Settings

2. **Add real blockchain integration**:

   - Replace mock wallet generation with real libraries
   - Integrate with blockchain nodes (Infura/Alchemy)
   - Add actual transaction signing
   - Implement Euclid Protocol SDK

3. **Enhance security**:

   - Add real JWT authentication
   - Implement biometric auth
   - Add seed phrase management
   - Use secure storage for private keys

4. **Add persistence**:

   - Replace in-memory storage with database
   - Add transaction history persistence
   - Implement proper user sessions

5. **Testing**:
   - Add unit tests for components
   - Add integration tests for API
   - Add E2E tests for critical flows

## Important Notes

⚠️ **This is a DEMONSTRATION/MVP**:

- No real blockchain operations
- No actual private key management
- Mock authentication only
- In-memory data (non-persistent)

For production use, you MUST:

- Implement real cryptographic key management
- Add proper authentication & authorization
- Connect to real blockchain networks
- Add comprehensive security auditing
- Use secure storage solutions
- Implement proper error handling
- Add rate limiting & DDoS protection

## Troubleshooting

### Backend won't start

```bash
cd backend
rm -rf node_modules
npm install
npm run dev
```

### Frontend won't start

```bash
cd frontend
rm -rf node_modules
npm install
npx expo start --clear
```

### TypeScript errors

Most import errors will resolve once you run the app. If persistent:

```bash
npm run tsc --noEmit
```

### Can't connect to backend

1. Ensure backend is running on `http://localhost:3000`
2. Check `/frontend/src/api/client.ts` has correct URL
3. For iOS Simulator, use `localhost`
4. For physical device, use your computer's IP address

## Resources

- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Zustand](https://github.com/pmndrs/zustand)
- [TypeScript](https://www.typescriptlang.org/)

---

Built with ❤️ for the Web3 community
