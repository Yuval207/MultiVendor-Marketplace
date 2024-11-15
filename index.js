import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import prisma from "./prisma/index.js";
import adminRoutes from "./src/api/admin/custom/route.js";
import vendorRoutes from "./src/api/store/custom/route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test Prisma Database Connection
(async () => {
  try {
    await prisma.$connect();
    console.log("Prisma connected to the database successfully.");
  } catch (error) {
    console.error("Prisma database connection error:", error);
    process.exit(1);
  }
})();

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/vendor", vendorRoutes);

// Health Check Route
app.get("/api/health", (req, res) => {
  res.status(200).send("API is working fine");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful Shutdown
process.on("SIGINT", async () => {
  console.log("\nShutting down gracefully...");
  await prisma.$disconnect(); // Disconnect Prisma Client
  process.exit(0);
});
