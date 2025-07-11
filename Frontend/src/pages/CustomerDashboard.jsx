import React, { useState } from "react";
import { Box, Button, TextField, Typography, Grid, Divider, Paper } from "@mui/material";
import QRCodeScanner from "../components/QRCodeScanner";

const CustomerDashboard = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [medicineDetails, setMedicineDetails] = useState(null);

  const handleVerify = () => {
    // Simulated verification logic
    setMedicineDetails({
      medicineName: "Paracetamol",
      manufacturerName: "ABC Pharma",
      dealerName: "XYZ Distributors",
      pharmacistName: "John Doe",
    });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Customer Dashboard
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Scan QR Code
        </Typography>
        <QRCodeScanner />
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Enter Aadhaar Number
        </Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label="Aadhaar Number"
              variant="outlined"
              value={aadhaarNumber}
              onChange={(e) => setAadhaarNumber(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button fullWidth variant="contained" onClick={handleVerify}>
              Verify
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {medicineDetails && (
        <Paper elevation={3} sx={{ p: 3, backgroundColor: "#f9f9f9" }}>
          <Typography variant="h6" gutterBottom>
            Medicine Details
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography>
            <strong>Medicine Name:</strong> {medicineDetails.medicineName}
          </Typography>
          <Typography>
            <strong>Manufacturer:</strong> {medicineDetails.manufacturerName}
          </Typography>
          <Typography>
            <strong>Dealer:</strong> {medicineDetails.dealerName}
          </Typography>
          <Typography>
            <strong>Pharmacist:</strong> {medicineDetails.pharmacistName}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default CustomerDashboard;
