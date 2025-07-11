const express = require("express");
const router = express.Router();
const qrController = require("../controllers/qrController");

router.post("/save-qr", qrController.saveQrCode);

module.exports = router;
