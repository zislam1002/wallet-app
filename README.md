# Lykos Wallet

A **beautiful, beginner-friendly Web3 wallet** built with React Native, designed for mass adoption. Lykos Wallet combines the simplicity of modern mobile banking apps with the power of decentralized finance.

## 🌟 Features

- **🔐 Secure by Default**: Bank-level security with biometric authentication and 2FA
- **🎨 Beautiful iOS-style UI**: Clean, minimal design with dark/light theme support
- **🌐 Multi-Chain Support**: Manage Bitcoin, Ethereum, Polygon, and more
- **💱 Built-in Swap & Bridge**: Token swapping and cross-chain bridging (Euclid Protocol ready)
- **🛡️ Security Center**: Automatic transaction scanning and risk assessment
- **🎁 Rewards System**: Earn EXP tokens for wallet activity
- **👨‍🎓 Pro Mode**: Toggle advanced features when needed

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- iOS Simulator or Android Emulator
- Expo CLI

### Installation

1. Install backend dependencies:

```bash
cd backend
npm install
```

2. Install frontend dependencies:

```bash
cd frontend
npm install
```

### Running the App

1. Start backend server:

```bash
cd backend
npm run dev
```

2. Start frontend (in new terminal):

```bash
cd frontend
npx expo start
```

Then press `i` for iOS or `a` for Android.

## 🛠 Tech Stack

**Frontend:** React Native (Expo), TypeScript, React Navigation, Zustand, React Hook Form

**Backend:** Express.js, TypeScript, Mock in-memory data

## 🔒 Security Note

⚠️ **This is a MOCK/DEMO application** - no real blockchain operations are performed. All crypto operations are simulated for demonstration purposes.

## 📁 Project Structure

```
wallet-app/
├── frontend/           # React Native app
│   ├── src/
│   │   ├── api/       # API client
│   │   ├── components/ # UI components
│   │   ├── navigation/ # Navigation config
│   │   ├── screens/   # App screens
│   │   ├── store/     # Zustand stores
│   │   ├── theme/     # Theme system
│   │   └── types/     # TypeScript types
│   └── App.tsx
│
└── backend/           # Express API server
    └── src/
        ├── controllers/ # Request handlers
        ├── routes/     # API routes
        ├── services/   # Business logic
        └── index.ts    # Server entry

```

## 🔌 API Endpoints

- `POST /auth/social-login` - Mock authentication
- `GET /wallets` - Get user wallets
- `GET /wallets/:id/transactions` - Get transactions
- `POST /transactions/send` - Send transaction
- `POST /swap` - Get swap quote
- `POST /bridge` - Get bridge quote
- `POST /security/scan` - Scan transactions
- `GET /rewards` - Get user rewards

## 📄 License

MIT License - feel free to use as a starting point for your own wallet app.

---

**Built with ❤️ for the Web3 community**
