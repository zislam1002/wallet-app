import { create } from "zustand";
import { Wallet, Transaction } from "../types";

interface WalletState {
  wallets: Wallet[];
  selectedWallet: Wallet | null;
  transactions: Transaction[];
  isLoading: boolean;

  setWallets: (wallets: Wallet[]) => void;
  setSelectedWallet: (wallet: Wallet) => void;
  setTransactions: (transactions: Transaction[]) => void;
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  wallets: [],
  selectedWallet: null,
  transactions: [],
  isLoading: false,

  setWallets: (wallets: Wallet[]) => {
    set({ wallets });
    if (wallets.length > 0 && !useWalletStore.getState().selectedWallet) {
      set({ selectedWallet: wallets[0] });
    }
  },

  setSelectedWallet: (wallet: Wallet) => set({ selectedWallet: wallet }),

  setTransactions: (transactions: Transaction[]) => set({ transactions }),

  addTransaction: (transaction: Transaction) =>
    set((state) => ({ transactions: [transaction, ...state.transactions] })),

  updateTransaction: (id: string, updates: Partial<Transaction>) =>
    set((state) => ({
      transactions: state.transactions.map((tx) =>
        tx.id === id ? { ...tx, ...updates } : tx
      ),
    })),
}));
