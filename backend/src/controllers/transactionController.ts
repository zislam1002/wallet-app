/**
 * Transaction Controller for Lykos Wallet
 * All blockchain transactions are mocked
 */

import { Request, Response } from "express";
import { addTransaction } from "../services/dataService";
import { Transaction } from "../types";

export const sendTransaction = (req: Request, res: Response) => {
  try {
    const { fromWalletId, to, token, amount } = req.body;
    const userId = (req.headers["x-user-id"] as string) || "default_user";

    if (!fromWalletId || !to || !token || !amount) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Mock transaction - no real blockchain interaction
    const transaction: Transaction = {
      id: `tx_${Date.now()}`,
      fromAddress: fromWalletId,
      toAddress: to,
      amount,
      tokenSymbol: token,
      chainId: "1", // Mock chain ID
      type: "send",
      status: "pending",
      createdAt: new Date().toISOString(),
      fee: "0.002",
      hash: `0x${Math.random().toString(16).substring(2, 66)}`,
    };

    // Simulate blockchain confirmation after 3 seconds
    setTimeout(() => {
      transaction.status = "completed";
    }, 3000);

    const savedTransaction = addTransaction(userId, transaction);
    res.json(savedTransaction);
  } catch (error) {
    console.error("Send transaction error:", error);
    res.status(500).json({ message: "Transaction failed" });
  }
};
