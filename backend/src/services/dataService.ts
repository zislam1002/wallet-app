/**
 * Mock Data Service for Lykos Wallet Backend
 * All data is mocked - no real blockchain or database operations
 * TODO: Replace with real database when moving to production
 */

import {
  User,
  Wallet,
  Transaction,
  SecurityScanResult,
  Reward,
  UserRewards,
  RecoveryRequest,
  Token,
} from "../types";

// In-memory storage (would be replaced with a real database)
const users: Map<string, User> = new Map();
const wallets: Map<string, Wallet[]> = new Map();
const transactions: Map<string, Transaction[]> = new Map();
const recoveryRequests: Map<string, RecoveryRequest> = new Map();
const userRewards: Map<string, UserRewards> = new Map();

// Mock wallet data generator
export const generateMockWallets = (userId: string): Wallet[] => {
  const mockWallets: Wallet[] = [
    {
      id: `wallet_eth_${userId}`,
      chainId: "1",
      chainName: "Ethereum",
      address: `0x${Math.random().toString(16).substring(2, 42)}`,
      balanceFiat: 5234.56,
      balanceCrypto: "2.45 ETH",
      color: "#627EEA",
      tokens: [
        {
          id: "eth_1",
          symbol: "ETH",
          name: "Ethereum",
          chainId: "1",
          balance: "2.45",
          fiatValue: 5234.56,
          decimals: 18,
        },
        {
          id: "usdt_1",
          symbol: "USDT",
          name: "Tether USD",
          chainId: "1",
          balance: "1000.00",
          fiatValue: 1000.0,
          decimals: 6,
        },
      ],
    },
    {
      id: `wallet_btc_${userId}`,
      chainId: "bitcoin",
      chainName: "Bitcoin",
      address: `bc1${Math.random().toString(36).substring(2, 42)}`,
      balanceFiat: 12500.0,
      balanceCrypto: "0.15 BTC",
      color: "#F7931A",
      tokens: [
        {
          id: "btc_1",
          symbol: "BTC",
          name: "Bitcoin",
          chainId: "bitcoin",
          balance: "0.15",
          fiatValue: 12500.0,
          decimals: 8,
        },
      ],
    },
    {
      id: `wallet_polygon_${userId}`,
      chainId: "137",
      chainName: "Polygon",
      address: `0x${Math.random().toString(16).substring(2, 42)}`,
      balanceFiat: 890.23,
      balanceCrypto: "1234.56 MATIC",
      color: "#8247E5",
      tokens: [
        {
          id: "matic_1",
          symbol: "MATIC",
          name: "Polygon",
          chainId: "137",
          balance: "1234.56",
          fiatValue: 890.23,
          decimals: 18,
        },
      ],
    },
  ];

  wallets.set(userId, mockWallets);
  return mockWallets;
};

// Mock transaction data generator
export const generateMockTransactions = (userId: string): Transaction[] => {
  const mockTransactions: Transaction[] = [
    {
      id: `tx_${Date.now()}_1`,
      fromAddress: "0x1234...abcd",
      toAddress: "0x5678...efgh",
      amount: "0.5",
      tokenSymbol: "ETH",
      chainId: "1",
      type: "send",
      status: "completed",
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      fee: "0.002",
      hash: `0x${Math.random().toString(16).substring(2, 66)}`,
    },
    {
      id: `tx_${Date.now()}_2`,
      fromAddress: "0x9876...wxyz",
      toAddress: "0x1234...abcd",
      amount: "100",
      tokenSymbol: "USDT",
      chainId: "1",
      type: "receive",
      status: "completed",
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      hash: `0x${Math.random().toString(16).substring(2, 66)}`,
    },
    {
      id: `tx_${Date.now()}_3`,
      fromAddress: "0x1234...abcd",
      toAddress: "0x1234...abcd",
      amount: "0.1",
      tokenSymbol: "ETH",
      chainId: "1",
      type: "swap",
      status: "completed",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      hash: `0x${Math.random().toString(16).substring(2, 66)}`,
    },
    {
      id: `tx_${Date.now()}_4`,
      fromAddress: "0x1234...abcd",
      toAddress: "0x5678...efgh",
      amount: "50",
      tokenSymbol: "USDT",
      chainId: "1",
      type: "bridge",
      status: "pending",
      createdAt: new Date(Date.now() - 1800000).toISOString(),
      hash: `0x${Math.random().toString(16).substring(2, 66)}`,
    },
    {
      id: `tx_${Date.now()}_5`,
      fromAddress: "0xabcd...1234",
      toAddress: "0x1234...abcd",
      amount: "250",
      tokenSymbol: "USDC",
      chainId: "137",
      type: "receive",
      status: "completed",
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      hash: `0x${Math.random().toString(16).substring(2, 66)}`,
    },
    {
      id: `tx_${Date.now()}_6`,
      fromAddress: "0x1234...abcd",
      toAddress: "0xdef0...5678",
      amount: "0.025",
      tokenSymbol: "BTC",
      chainId: "bitcoin",
      type: "send",
      status: "completed",
      createdAt: new Date(Date.now() - 259200000).toISOString(),
      fee: "0.0001",
      hash: `0x${Math.random().toString(16).substring(2, 66)}`,
    },
    {
      id: `tx_${Date.now()}_7`,
      fromAddress: "0x1234...abcd",
      toAddress: "0x1234...abcd",
      amount: "500",
      tokenSymbol: "MATIC",
      chainId: "137",
      type: "swap",
      status: "completed",
      createdAt: new Date(Date.now() - 432000000).toISOString(),
      hash: `0x${Math.random().toString(16).substring(2, 66)}`,
    },
    {
      id: `tx_${Date.now()}_8`,
      fromAddress: "0x5678...wxyz",
      toAddress: "0x1234...abcd",
      amount: "1.5",
      tokenSymbol: "ETH",
      chainId: "1",
      type: "receive",
      status: "completed",
      createdAt: new Date(Date.now() - 604800000).toISOString(),
      hash: `0x${Math.random().toString(16).substring(2, 66)}`,
    },
    {
      id: `tx_${Date.now()}_9`,
      fromAddress: "0x1234...abcd",
      toAddress: "0x9876...abcd",
      amount: "75",
      tokenSymbol: "USDT",
      chainId: "1",
      type: "send",
      status: "failed",
      createdAt: new Date(Date.now() - 10800000).toISOString(),
      fee: "0.001",
      hash: `0x${Math.random().toString(16).substring(2, 66)}`,
    },
    {
      id: `tx_${Date.now()}_10`,
      fromAddress: "0x1234...abcd",
      toAddress: "0x1234...abcd",
      amount: "200",
      tokenSymbol: "USDC",
      chainId: "1",
      type: "bridge",
      status: "completed",
      createdAt: new Date(Date.now() - 21600000).toISOString(),
      hash: `0x${Math.random().toString(16).substring(2, 66)}`,
    },
  ];

  transactions.set(userId, mockTransactions);
  return mockTransactions;
};

// User service
export const createUser = (email: string, name?: string): User => {
  const userId = `user_${Date.now()}`;
  const user: User = {
    id: userId,
    name: email.split("@")[0],
    email,
    twoFAEnabled: false,
    backedUp: false,
    proModeEnabled: false,
    createdAt: new Date().toISOString(),
    rewards: 150,
    isPro: false,
  };

  users.set(userId, user);

  // Generate initial mock data
  generateMockWallets(userId);
  generateMockTransactions(userId);

  // Initialize rewards
  userRewards.set(userId, {
    totalExp: 150,
    level: 2,
    rewards: [
      {
        id: "reward_1",
        type: "transaction",
        expAmount: 10,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        source: "First Transaction",
        description: "Complete your first transaction",
      },
      {
        id: "reward_2",
        type: "swap",
        expAmount: 25,
        createdAt: new Date(Date.now() - 43200000).toISOString(),
        source: "First Swap",
        description: "Complete your first token swap",
      },
    ],
  });

  return user;
};

export const getUserById = (userId: string): User | undefined => {
  return users.get(userId);
};

export const getUserWallets = (userId: string): Wallet[] => {
  return wallets.get(userId) || [];
};

export const getUserTransactions = (userId: string): Transaction[] => {
  return transactions.get(userId) || [];
};

export const addTransaction = (
  userId: string,
  transaction: Transaction
): Transaction => {
  const userTransactions = transactions.get(userId) || [];
  userTransactions.unshift(transaction);
  transactions.set(userId, userTransactions);

  // Add reward for transaction
  const rewards = userRewards.get(userId);
  if (rewards) {
    rewards.totalExp += 10;
    rewards.level = Math.floor(rewards.totalExp / 100) + 1;
    rewards.rewards.push({
      id: `reward_${Date.now()}`,
      type: "transaction",
      expAmount: 10,
      createdAt: new Date().toISOString(),
      source: "Transaction Completed",
      description: `Completed ${transaction.type} transaction`,
    });
    userRewards.set(userId, rewards);
  }

  return transaction;
};

export const scanTransaction = (transactionId: string): SecurityScanResult => {
  const riskLevels: ("low" | "medium" | "high")[] = [
    "low",
    "low",
    "low",
    "medium",
    "high",
  ];
  const riskLevel = riskLevels[Math.floor(Math.random() * riskLevels.length)];

  const messages = {
    low: "Contract verified. Transaction appears safe.",
    medium: "Unknown token. Proceed with caution.",
    high: "Warning: Potential security risk detected.",
  };

  return {
    transactionId,
    riskLevel,
    message: messages[riskLevel],
    timestamp: new Date().toISOString(),
  };
};

export const createRecoveryRequest = (
  userId: string,
  description: string,
  contactEmail: string
): RecoveryRequest => {
  const requestId = `recovery_${Date.now()}`;
  const request: RecoveryRequest = {
    id: requestId,
    userId,
    description,
    contactEmail,
    status: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  recoveryRequests.set(requestId, request);
  return request;
};

export const getUserRewards = (userId: string): UserRewards => {
  return (
    userRewards.get(userId) || {
      totalExp: 0,
      level: 1,
      rewards: [],
    }
  );
};

// Mock authentication - returns a fake JWT-like token
export const generateAuthToken = (userId: string): string => {
  return `mock_token_${userId}_${Date.now()}`;
};
