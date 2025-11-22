/**
 * Rewards Controller for Lykos Wallet
 * Mock EXP token and rewards system
 */

import { Request, Response } from "express";
import { getUserRewards } from "../services/dataService";

export const getRewards = (req: Request, res: Response) => {
  try {
    const userId = (req.headers["x-user-id"] as string) || "default_user";

    const rewards = getUserRewards(userId);
    res.json(rewards);
  } catch (error) {
    console.error("Get rewards error:", error);
    res.status(500).json({ message: "Failed to fetch rewards" });
  }
};
