import React, { useState, useContext } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const MedicineRegistration = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    serialNumber: "",
    productCode: "",
    drugName: "",
    brandName: "",
    expiryDate: "",
    manufacturingDate: "",
    batchNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user._id) {
      alert("Manufacturer is not logged in. Please login first.");
      return;
    }

    const payload = {
      ...formData,
      manufacturerId: user._id,
      manufacturerName: user.name,
      manufacturerAddress: user.address,
      manufacturingLicense: user.license,
    };

    try {
      const res = await axios.post("http://localhost:8002/qr/register-medicine", payload);
      alert("Medicine registered and QR code saved!");
      console.log("Saved QR Record:", res.data);
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      alert("Error saving medicine details.");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Medicine Registration
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Serial Number" name="serialNumber" value={formData.serialNumber} onChange={handleChange} required />
        <TextField label="Unique Product Identification Code" name="productCode" value={formData.productCode} onChange={handleChange} required />
        <TextField label="Drug Name" name="drugName" value={formData.drugName} onChange={handleChange} required />
        <TextField label="Brand Name" name="brandName" value={formData.brandName} onChange={handleChange} required />
        <TextField type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} required InputLabelProps={{ shrink: true }} label="Date of Expiry" />
        <TextField type="date" name="manufacturingDate" value={formData.manufacturingDate} onChange={handleChange} required InputLabelProps={{ shrink: true }} label="Date of Manufacturing" />
        <TextField label="Batch Number" name="batchNumber" value={formData.batchNumber} onChange={handleChange} required />
        <Button type="submit" variant="contained" color="primary">
          Register Medicine
        </Button>
      </Box>
    </Paper>
  );
};

export default MedicineRegistration;
