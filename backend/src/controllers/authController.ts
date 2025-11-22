/**
 * Auth Controller for Lykos Wallet
 * Handles mock authentication - no real OAuth or blockchain wallet auth
 */

import { Request, Response } from "express";
import { createUser, generateAuthToken } from "../services/dataService";

export const socialLogin = (req: Request, res: Response) => {
  try {
    const { provider, email, password, newWallet } = req.body;

    // Mock authentication - always succeeds with valid email
    if (!email || !provider) {
      return res
        .status(400)
        .json({ message: "Email and provider are required" });
    }

    // Create or get mock user
    const user = createUser(email, `User ${Math.floor(Math.random() * 1000)}`);
    const token = generateAuthToken(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.error("Social login error:", error);
    res.status(500).json({ message: "Authentication failed" });
  }
};
