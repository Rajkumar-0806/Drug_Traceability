import React from "react";
import { Box, Typography, Container, Button } from "@mui/material";
import { Link } from "react-router-dom";

const MedicineDetails = () => {
  // Example medicine data (replace with dynamic data from an API or state)
  const medicine = {
    serialNumber: "12345",
    productId: "PROD123",
    drugName: "Paracetamol",
    brandName: "Tylenol",
    manufacturer: "ABC Pharmaceuticals",
    batchNumber: "BATCH789",
    manufacturingDate: "2023-05-01",
    expiryDate: "2025-10-12",
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Medicine Details
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="body1">
          <strong>Serial Number:</strong> {medicine.serialNumber}
        </Typography>
        <Typography variant="body1">
          <strong>Product ID:</strong> {medicine.productId}
        </Typography>
        <Typography variant="body1">
          <strong>Drug Name:</strong> {medicine.drugName}
        </Typography>
        <Typography variant="body1">
          <strong>Brand Name:</strong> {medicine.brandName}
        </Typography>
        <Typography variant="body1">
          <strong>Manufacturer:</strong> {medicine.manufacturer}
        </Typography>
        <Typography variant="body1">
          <strong>Batch Number:</strong> {medicine.batchNumber}
        </Typography>
        <Typography variant="body1">
          <strong>Manufacturing Date:</strong> {medicine.manufacturingDate}
        </Typography>
        <Typography variant="body1">
          <strong>Expiry Date:</strong> {medicine.expiryDate}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/purchase-medicine"
          sx={{ mt: 2 }}
        >
          Purchase Medicine
        </Button>
      </Box>
    </Container>
  );
};

export default MedicineDetails;