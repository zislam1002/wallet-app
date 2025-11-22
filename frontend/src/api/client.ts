/**
 * API Client for Lykos Wallet
 * All endpoints connect to mock backend - no real blockchain operations
 */

import {
  User,
  Wallet,
  Transaction,
  SwapQuote,
  BridgeQuote,
  SecurityScanResult,
  UserRewards,
  RecoveryRequest,
  AuthResponse,
} from "../types";

// TODO: Replace with your actual backend URL
const API_BASE_URL = "http://localhost:3000";

class ApiClient {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(this.token && { Authorization: `Bearer ${this.token}` }),
      ...options?.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ message: "Request failed" }));
      throw new Error(error.message || "Request failed");
    }

    return response.json();
  }

  // Auth endpoints
  async socialLogin(
    provider: "google" | "apple" | "email",
    credentials?: any
  ): Promise<AuthResponse> {
    return this.request<AuthResponse>("/auth/social-login", {
      method: "POST",
      body: JSON.stringify({ provider, ...credentials }),
    });
  }

  // Wallet endpoints
  async getWallets(): Promise<Wallet[]> {
    return this.request<Wallet[]>("/wallets");
  }

  async getTransactions(walletId: string): Promise<Transaction[]> {
    return this.request<Transaction[]>(`/wallets/${walletId}/transactions`);
  }

  // Transaction endpoints
  async sendTransaction(data: {
    fromWalletId: string;
    to: string;
    token: string;
    amount: string;
  }): Promise<Transaction> {
    return this.request<Transaction>("/transactions/send", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Swap endpoint
  async getSwapQuote(data: {
    fromToken: string;
    toToken: string;
    amount: string;
    chainId: string;
  }): Promise<SwapQuote> {
    return this.request<SwapQuote>("/swap", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async executeSwap(data: {
    fromToken: string;
    toToken: string;
    amount: string;
    chainId: string;
  }): Promise<Transaction> {
    return this.request<Transaction>("/swap/execute", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Bridge endpoint
  async getBridgeQuote(data: {
    fromChain: string;
    toChain: string;
    token: string;
    amount: string;
  }): Promise<BridgeQuote> {
    return this.request<BridgeQuote>("/bridge", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async executeBridge(data: {
    fromChain: string;
    toChain: string;
    token: string;
    amount: string;
  }): Promise<Transaction> {
    return this.request<Transaction>("/bridge/execute", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Security endpoints
  async scanTransactions(
    transactionIds: string[]
  ): Promise<SecurityScanResult[]> {
    return this.request<SecurityScanResult[]>("/security/scan", {
      method: "POST",
      body: JSON.stringify({ transactionIds }),
    });
  }

  // Recovery endpoint
  async submitRecoveryRequest(data: {
    description: string;
    contactEmail: string;
  }): Promise<RecoveryRequest> {
    return this.request<RecoveryRequest>("/recovery/request", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Rewards endpoint
  async getRewards(): Promise<UserRewards> {
    return this.request<UserRewards>("/rewards");
  }
}

export const api = new ApiClient();
