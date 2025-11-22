/**
 * Type definitions for Lykos Wallet Backend
 * Matches frontend types - all mock data, no real blockchain operations
 */

export interface User {
  id: string;
  name: string;
  email: string;
  twoFAEnabled: boolean;
  backedUp: boolean;
  proModeEnabled: boolean;
  createdAt: string;
  avatar?: string;
  rewards?: number;
  isPro?: boolean;
}

export interface Token {
  id: string;
  symbol: string;
  name: string;
  chainId: string;
  balance: string;
  fiatValue: number;
  logo?: string;
  decimals?: number;
}

export interface Wallet {
  id: string;
  chainId: string;
  chainName: string;
  address: string;
  balanceFiat: number;
  balanceCrypto: string;
  tokens: Token[];
  logo?: string;
  color?: string;
}

export type TransactionType = "send" | "receive" | "swap" | "bridge";
export type TransactionStatus = "pending" | "completed" | "failed";

export interface Transaction {
  id: string;
  fromAddress: string;
  toAddress: string;
  amount: string;
  tokenSymbol: string;
  chainId: string;
  type: TransactionType;
  status: TransactionStatus;
  createdAt: string;
  fee?: string;
  hash?: string;
}

export type RiskLevel = "low" | "medium" | "high";

export interface SecurityScanResult {
  transactionId: string;
  riskLevel: RiskLevel;
  message: string;
  timestamp: string;
}

export type RewardSource =
  | "transaction"
  | "bridge"
  | "swap"
  | "referral"
  | "security";

export interface Reward {
  id: string;
  type: RewardSource;
  expAmount: number;
  createdAt: string;
  source: string;
  description?: string;
}

export interface UserRewards {
  totalExp: number;
  level: number;
  rewards: Reward[];
}

export type RecoveryStatus = "pending" | "approved" | "denied";

export interface RecoveryRequest {
  id: string;
  userId: string;
  description: string;
  contactEmail: string;
  status: RecoveryStatus;
  createdAt: string;
  updatedAt: string;
}

export interface SwapQuote {
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
  rate: string;
  slippage: string;
  estimatedTime: string;
  gasFree: boolean;
  chainId: string;
}

export interface BridgeQuote {
  fromChain: string;
  toChain: string;
  token: string;
  amount: string;
  estimatedTime: string;
  fee: string;
  steps: BridgeStep[];
}

export type BridgeStepStatus =
  | "pending"
  | "in-progress"
  | "completed"
  | "failed";

export interface BridgeStep {
  id: string;
  description: string;
  status: BridgeStepStatus;
}
