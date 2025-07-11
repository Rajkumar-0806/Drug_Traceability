const express = require("express");
const router = express.Router();
const cors = require("cors");

const {
  test,
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/authController");

const { authenticate } = require("../middleware/authMiddleware");

const User = require("../models/User");
const QRCodeModel = require("../models/qrCode"); // Fixed capitalization for consistency
const QRCodeLib = require("qrcode");

// CORS config - Make sure this is at the top before routes that need it
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

// Test route
router.get("/", test);

// Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authenticate, getProfile);

// Fetch all dealer IDs
router.get("/dealers", async (req, res) => {
  try {
    const dealers = await User.find({ role: "dealer" }, "dealerId");
    const dealerIds = dealers.map((dealer) => dealer.dealerId);
    res.json(dealerIds);
  } catch (error) {
    console.error("Error fetching dealers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch all pharmacist IDs
router.get("/pharmacists", async (req, res) => {
  try {
    const pharmacists = await User.find({ role: "pharmacist" }, "pharmacistId");
    const pharmacistIds = pharmacists.map((p) => p.pharmacistId);
    res.json(pharmacistIds);
  } catch (error) {
    console.error("Error fetching pharmacists:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Dealer updating QR code with their info and pharmacist ID
router.post("/qr/update-qr-by-dealer", async (req, res) => {
  const { qrData, dealerName, dealerLicense, pharmacistId } = req.body;

  try {
    const updated = await QRCodeModel.findOneAndUpdate(
      { qrData },
      {
        $set: {
          dealerName,
          dealerLicense,
          pharmacistId,
          updatedAt: new Date(),
        },
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "QR entry not found" });
    }

    res.json({ message: "QR updated by dealer", updated });
  } catch (error) {
    console.error("Error updating QR by dealer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Pharmacist updating QR code with their info and customer Aadhaar
router.post("/qr/update-qr-by-pharmacist", async (req, res) => {
  const {
    qrData,
    pharmacistId,
    pharmacistName,
    pharmacistAddress,
    pharmacistLicense,
    customerAadhaar,
  } = req.body;

  try {
    // Append pharmacistId to qrData if not already present
    let newQRData = qrData;
    if (!qrData.includes(pharmacistId)) {
      newQRData = qrData + "|" + pharmacistId;
    }

    const updated = await QRCodeModel.findOneAndUpdate(
      { qrData }, // Find the original qrData entry
      {
        $set: {
          qrData: newQRData, // Update qrData with pharmacistId appended
          pharmacistName,
          pharmacistAddress,
          pharmacistLicense,
          customerAadhaar,
          updatedAt: new Date(),
        },
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "QR entry not found" });
    }

    res.json({ message: "QR updated with pharmacist info", updated });
  } catch (error) {
    console.error("Error updating QR by pharmacist:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Register medicine and generate QR code entry

router.post("/register-medicine", async (req, res) => {
  try {
    const {
      serialNumber,
      productCode,
      drugName,
      brandName,
      expiryDate,
      manufacturingDate,
      batchNumber,
      manufacturerId,
      manufacturerName,
      manufacturerAddress,
      manufacturingLicense,
      dealerId = "PENDING", // default if dealer not assigned yet
      dealerName = "",
      dealerLicense = "",
      pharmacistId = "",
      pharmacistName = "",
      pharmacistAddress = "",
      pharmacistLicense = "",
      customerAadhaarNumber = "",
    } = req.body;

    // Compose qrData ONLY with user IDs separated by pipe (|) symbol
    const qrData = `${manufacturerId}|${dealerId}|${pharmacistId}|${customerAadhaarNumber}`;

    // Generate QR code image from qrData string
    const qrImageUrl = await QRCodeLib.toDataURL(qrData);

    // Create QR code document with detailed fields saved separately
    const qrEntry = new QRCodeModel({
      qrData,
      qrImageUrl,

      // Manufacturer Details
      manufacturerId,
      manufacturerName,
      manufacturerAddress,
      manufacturingLicense,

      // Dealer Details
      dealerId,
      dealerName,
      dealerLicense,

      // Pharmacist Details
      pharmacistId,
      pharmacistName,
      pharmacistAddress,
      pharmacistLicense,

      // Customer Aadhaar
      customerAadhaarNumber,

      // Medicine details
      medicineName: drugName,
      batchNumber,
      manufacturingDate,
      expiryDate,
    });

    await qrEntry.save();

    res.status(201).json(qrEntry);
  } catch (err) {
    console.error("Error saving medicine details:", err);
    res.status(500).json({ error: "Failed to register medicine" });
  }
});


module.exports = router;
