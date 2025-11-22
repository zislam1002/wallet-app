/**
 * API Routes for Lykos Wallet Backend
 */

import { Router } from "express";
import { socialLogin } from "../controllers/authController";
import { getWallets, getTransactions } from "../controllers/walletController";
import { sendTransaction } from "../controllers/transactionController";
import { getSwapQuote, executeSwap } from "../controllers/swapController";
import { getBridgeQuote, executeBridge } from "../controllers/bridgeController";
import {
  scanTransactions,
  submitRecoveryRequest,
} from "../controllers/securityController";
import { getRewards } from "../controllers/rewardsController";

const router = Router();

// Auth routes
router.post("/auth/social-login", socialLogin);

// Wallet routes
router.get("/wallets", getWallets);
router.get("/wallets/:id/transactions", getTransactions);

// Transaction routes
router.post("/transactions/send", sendTransaction);

// Swap routes (Euclid Protocol placeholder)
router.post("/swap", getSwapQuote);
router.post("/swap/execute", executeSwap);

// Bridge routes
router.post("/bridge", getBridgeQuote);
router.post("/bridge/execute", executeBridge);

// Security routes
router.post("/security/scan", scanTransactions);
router.post("/recovery/request", submitRecoveryRequest);

// Rewards routes
router.get("/rewards", getRewards);

export default router;
