import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import appRouter from "./routes/index.js";
config();
const app = express();
// ==========================
// 🔹 CORS Configuration
// ==========================
const allowedOrigins = [
    "http://localhost:5173", // Local dev (Vite)
    "https://mern-gpt-1-1-prefinal.vercel.app" // Deployed frontend
];
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like curl, Postman)
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        else {
            return callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
// ==========================
// 🔹 Core Middlewares
// ==========================
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
// ==========================
// 🔹 Logger (only in development)
// ==========================
if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
}
// ==========================
// 🔹 Main API Route
// ==========================
app.use("/api/v1", appRouter);
// ==========================
// 🔹 Root Health Check (optional)
// ==========================
app.get("/", (req, res) => {
    res.status(200).json({ message: "Server is running successfully ✅" });
});
export default app;
//# sourceMappingURL=app.js.map