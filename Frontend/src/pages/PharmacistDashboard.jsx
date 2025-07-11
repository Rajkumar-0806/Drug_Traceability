import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container } from "@mui/material";
import QRCodeScanner from "../components/QRCodeScanner";

const PharmacistDashboard = () => {
  const [formData, setFormData] = useState({
    pharmacistName: "",
    pharmacistAddress: "",
    pharmacistLicense: "",
  });

  const [customerAadhaar, setCustomerAadhaar] = useState("");
  const [scannedData, setScannedData] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!scannedData) {
      alert("Please scan a QR code before submitting.");
      return;
    }

    try {
      // Send the original scannedData to backend to find the record,
      // backend will handle appending pharmacistLicense to qrData.
      const payload = {
        qrData: scannedData,
        pharmacistName: formData.pharmacistName,
        pharmacistAddress: formData.pharmacistAddress,
        pharmacistLicense: formData.pharmacistLicense,
        customerAadhaar,
      };

      const response = await fetch("/qr/update-qr-by-pharmacist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update QR data");
      }

      alert("Pharmacist and Customer Aadhaar data saved successfully!");
      setIsSubmitted(true);
    } catch (error) {
      alert("Error saving data: " + error.message);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Pharmacist Dashboard
      </Typography>

      {!scannedData && !isSubmitted && (
        <>
          <Typography variant="h5" sx={{ marginTop: "30px" }} gutterBottom>
            QR Code Scanner
          </Typography>
          <QRCodeScanner onScanResult={setScannedData} />
        </>
      )}

      {scannedData && !isSubmitted && (
        <Box sx={{ mt: 2, p: 2, backgroundColor: "#e0ffe0" }}>
          <Typography variant="body1">Scanned Result: {scannedData}</Typography>
        </Box>
      )}

      {!isSubmitted && scannedData && (
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}
        >
          <TextField
            label="Pharmacist Name"
            name="pharmacistName"
            value={formData.pharmacistName}
            onChange={handleChange}
            required
          />
          <TextField
            label="Pharmacist Address"
            name="pharmacistAddress"
            value={formData.pharmacistAddress}
            onChange={handleChange}
            required
          />
          <TextField
            label="Pharmacist License Number"
            name="pharmacistLicense"
            value={formData.pharmacistLicense}
            onChange={handleChange}
            required
          />
          <TextField
            label="Customer Aadhaar Number"
            name="customerAadhaar"
            value={customerAadhaar}
            onChange={(e) => setCustomerAadhaar(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Save Pharmacist Data & Aadhaar
          </Button>
        </Box>
      )}

      {isSubmitted && (
        <Typography variant="h6" sx={{ mt: 3, color: "green" }}>
          Data saved successfully!
        </Typography>
      )}
    </Container>
  );
};

export default PharmacistDashboard;
