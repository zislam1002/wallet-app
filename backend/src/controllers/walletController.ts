/**
 * Wallet Controller for Lykos Wallet
 * All blockchain operations are mocked
 */

import { Request, Response } from "express";
import { getUserWallets, getUserTransactions } from "../services/dataService";

export const getWallets = (req: Request, res: Response) => {
  try {
    // In a real app, get userId from auth token
    const userId = (req.headers["x-user-id"] as string) || "default_user";

    const wallets = getUserWallets(userId);
    res.json(wallets);
  } catch (error) {
    console.error("Get wallets error:", error);
    res.status(500).json({ message: "Failed to fetch wallets" });
  }
};

export const getTransactions = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req.headers["x-user-id"] as string) || "default_user";

    const transactions = getUserTransactions(userId);
    res.json(transactions);
  } catch (error) {
    console.error("Get transactions error:", error);
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
};
