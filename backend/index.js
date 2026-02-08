import "dotenv/config";

import express from "express";
import cors from "cors";

import connectDB from "./config/connectDB.js";
import authRoutes from "./routes/authRoutes.js";
import songRoutes from "./routes/songRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

/* =======================
   Body Parsers
======================= */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/* =======================
   CORS (ENOUGH ON ITS OWN)
======================= */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* =======================
   Database
======================= */
connectDB();

/* =======================
   Routes
======================= */
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);

/* =======================
   Health Check
======================= */
app.get("/", (req, res) => {
  res.json({ message: "Server running 🚀" });
});

/* =======================
   Server
======================= */
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
