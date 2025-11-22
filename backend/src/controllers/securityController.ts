/**
 * Security Controller for Lykos Wallet
 * Mock security scanning and recovery operations
 */

import { Request, Response } from "express";
import {
  scanTransaction,
  createRecoveryRequest,
} from "../services/dataService";

export const scanTransactions = (req: Request, res: Response) => {
  try {
    const { transactionIds } = req.body;

    if (!transactionIds || !Array.isArray(transactionIds)) {
      return res.status(400).json({ message: "Invalid transaction IDs" });
    }

    // Mock security scan
    const results = transactionIds.map((txId) => scanTransaction(txId));
    res.json(results);
  } catch (error) {
    console.error("Scan transactions error:", error);
    res.status(500).json({ message: "Security scan failed" });
  }
};

export const submitRecoveryRequest = (req: Request, res: Response) => {
  try {
    const { description, contactEmail } = req.body;
    const userId = (req.headers["x-user-id"] as string) || "default_user";

    if (!description || !contactEmail) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const request = createRecoveryRequest(userId, description, contactEmail);
    res.json(request);
  } catch (error) {
    console.error("Submit recovery request error:", error);
    res.status(500).json({ message: "Recovery request failed" });
  }
};
