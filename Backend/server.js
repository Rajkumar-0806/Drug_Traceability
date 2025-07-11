require("dotenv").config(); // Must be at very top

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const qrRoutes = require("./routes/qrRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Debug log Mongo URL (make sure your .env has MONGO_URL)
console.log("MONGO_URL:", process.env.MONGO_URL);

mongoose.set("debug", true); // Log Mongoose queries for debugging

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Database connected:", mongoose.connection.name))
  .catch((err) => console.error("❌ Database connection error:", err));

mongoose.connection.on("connected", () => {
  console.log("Mongoose default connection is open to:", mongoose.connection.name);
});

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your React app URL
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/", authRoutes); // your auth routes (login/register/profile)
app.use("/qr", qrRoutes); // qr code routes

// Optional: a quick test route for QR saving (you can remove if using /qr/generate)
app.post("/save-qr", (req, res) => {
  const { qrData, qrImageUrl } = req.body;
  console.log("QR Data:", qrData);
  console.log("QR Image URL:", qrImageUrl);
  res.status(200).json({ message: "QR saved successfully" });
});

// Start server
const port = process.env.PORT || 8002;
app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
