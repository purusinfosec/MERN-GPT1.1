import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user-routes.js";
import { connectToDatabase } from "./db/connection.js";

dotenv.config();

const app = express();

// ✅ CORS middleware
app.use(cors({ origin: "https://your-frontend.vercel.app" }));

// Body parser
app.use(express.json());

// Routes
app.use("/api/v1/user", userRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Backend is running!" });
});

// Connect to DB
connectToDatabase();

export default app;
