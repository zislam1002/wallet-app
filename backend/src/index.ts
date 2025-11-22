/**
 * Lykos Wallet Backend Server
 * Mock API server - all blockchain operations are simulated
 *
 * TODO: Replace mock data with real database
 * TODO: Implement real authentication with JWT
 * TODO: Add rate limiting and security middleware
 * TODO: Integrate with real blockchain providers (Infura, Alchemy, etc.)
 * TODO: Integrate with Euclid Protocol for swaps
 */

import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API routes
app.use("/", routes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Lykos Wallet Backend is running",
    timestamp: new Date().toISOString(),
    mode: "mock",
  });
});

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Error:", err);
    res.status(500).json({
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
});

// Start server
app.listen(PORT, () => {
  console.log("=".repeat(50));
  console.log("🚀 Lykos Wallet Backend Server");
  console.log("=".repeat(50));
  console.log(`📡 Server running on port ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
  console.log(`⚠️  Mode: MOCK (No real blockchain operations)`);
  console.log("=".repeat(50));
});

export default app;
