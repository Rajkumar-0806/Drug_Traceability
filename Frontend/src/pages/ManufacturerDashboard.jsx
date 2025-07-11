import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Divider,
  Alert,
} from "@mui/material";

import MedicineRegistration from "./MedicineRegistration";
import QRCodeGenerator from "./QRCodeGenerator";

const ManufacturerDashboard = () => {
  // Store manufacturer info here
  const [manufacturerInfo, setManufacturerInfo] = useState({
    manufacturerName: "",
    manufacturerAddress: "",
    manufacturingLicense: "",
  });

  // Success message state
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setManufacturerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Could add more complex validation here if needed

    // For now just simulate save
    setSuccessMessage("Manufacturer data saved successfully!");

    // Clear success message after 3 seconds
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manufacturer Dashboard
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Manufacturer Information
        </Typography>

        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Manufacturer Name"
            name="manufacturerName"
            value={manufacturerInfo.manufacturerName}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Manufacturer Address"
            name="manufacturerAddress"
            value={manufacturerInfo.manufacturerAddress}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Manufacturing License Number"
            name="manufacturingLicense"
            value={manufacturerInfo.manufacturingLicense}
            onChange={handleChange}
            required
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">
            Save Manufacturer Data
          </Button>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Medicine Registration
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {/* Pass manufacturer info to medicine registration if needed */}
        <MedicineRegistration manufacturerInfo={manufacturerInfo} />
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Generate QR Codes
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {/* Pass manufacturer info to QR code generator if needed */}
        <QRCodeGenerator manufacturerInfo={manufacturerInfo} />
      </Paper>
    </Box>
  );
};

export default ManufacturerDashboard;
