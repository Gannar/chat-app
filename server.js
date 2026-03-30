// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

// Initialize app
const app = express();

// ===== Middleware =====
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// ===== MongoDB Connection =====
const MONGO_URI = "mongodb://127.0.0.1:27017/mydatabase";

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // stop app if DB fails
  });

// ===== Routes =====
app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

// ===== Error Handling =====
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// ===== Start Server =====
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);
});