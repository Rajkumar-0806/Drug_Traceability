// models/qrCode.js
const mongoose = require("mongoose");

const qrCodeSchema = new mongoose.Schema({
  qrData: { type: String, required: true },
  qrImageUrl: { type: String, required: true },
  manufacturerId: { type: String, required: true },
  dealerId: { type: String, required: true },
  pharmacistId: { type: String, default: "" }, // placeholder
  customerAadhaarNumber: { type: String, default: "" }, // placeholder
}, { timestamps: true });

module.exports = mongoose.model("QrCode", qrCodeSchema);
