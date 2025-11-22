/**
 * Navigation type definitions for Lykos Wallet
 */

export type AuthStackParamList = {
  Welcome: undefined;
  SignIn: { provider?: "google" | "apple" | "email" };
  CreateWallet: undefined;
  TwoFASetup: { skipable?: boolean };
};

export type HomeStackParamList = {
  Home: undefined;
  Portfolio: undefined;
};

export type PaymentsStackParamList = {
  Send: undefined;
  Receive: undefined;
  SendConfirm: {
    fromWallet: string;
    to: string;
    token: string;
    amount: string;
  };
};

export type DiscoverStackParamList = {
  Swap: undefined;
  Bridge: undefined;
  SwapConfirm: {
    fromToken: string;
    toToken: string;
    amount: string;
    chainId: string;
  };
  BridgeConfirm: {
    fromChain: string;
    toChain: string;
    token: string;
    amount: string;
  };
};

export type SecurityStackParamList = {
  SecurityCenter: undefined;
  AccountRecovery: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
  Rewards: undefined;
  Settings: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  PaymentsTab: undefined;
  DiscoverTab: undefined;
  SecurityTab: undefined;
  ProfileTab: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};
