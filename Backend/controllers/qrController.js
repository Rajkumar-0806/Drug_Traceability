const QrCode = require("../models/qrCode");

exports.saveQrCode = async (req, res) => {
  try {
    const { qrData, qrImageUrl, manufacturerId, dealerId } = req.body;

    if (!qrData || !qrImageUrl || !manufacturerId || !dealerId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newQrCode = new QrCode({
      qrData,
      qrImageUrl,
      manufacturerId,
      dealerId,
    });

    await newQrCode.save();

    return res.status(201).json({ message: "QR code saved successfully", data: newQrCode });
  } catch (error) {
    console.error("Error saving QR code:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
