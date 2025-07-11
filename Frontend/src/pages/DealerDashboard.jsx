import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  MenuItem,
} from "@mui/material";
import QRCodeScanner from "../components/QRCodeScanner";

const DealerDashboard = () => {
  const [scannedData, setScannedData] = useState("");
  const [dealerName, setDealerName] = useState("");
  const [dealerLicense, setDealerLicense] = useState("");
  const [pharmacistId, setPharmacistId] = useState("");
  const [pharmacistList, setPharmacistList] = useState([]);
  const [loadingPharmacists, setLoadingPharmacists] = useState(true);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPharmacists = async () => {
      try {
        const response = await axios.get("/pharmacists");
        setPharmacistList(response.data);
      } catch (error) {
        console.error("Error fetching pharmacists:", error);
        setPharmacistList([]);
      } finally {
        setLoadingPharmacists(false);
      }
    };

    fetchPharmacists();
  }, []);

  const handleSave = async () => {
    if (!scannedData || !dealerName || !dealerLicense || !pharmacistId) {
      setMessage("Please scan QR and fill in all fields.");
      return;
    }

    setSaving(true);
    setMessage("");

    try {
      await axios.post("/qr/update-qr-by-dealer", {
        qrData: scannedData,
        dealerName,
        dealerLicense,
        pharmacistId,
      });

      setMessage("QR data updated successfully!");
      setScannedData("");
      setDealerName("");
      setDealerLicense("");
      setPharmacistId("");
    } catch (error) {
      console.error("Error saving QR data:", error);
      setMessage("Failed to update QR data.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Dealer Dashboard
      </Typography>

      <Typography variant="h6" gutterBottom>
        Step 1: Scan Manufacturer QR Code
      </Typography>
      <QRCodeScanner onScanResult={setScannedData} />

      {scannedData && (
        <Box mt={2} p={2} bgcolor="#e0f7fa">
          <Typography variant="body1">
            <strong>Scanned Data:</strong> {scannedData}
          </Typography>
        </Box>
      )}

      <Typography variant="h6" mt={4} gutterBottom>
        Step 2: Add Dealer Info & Pharmacist
      </Typography>

      <TextField
        label="Dealer Name"
        value={dealerName}
        onChange={(e) => setDealerName(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Dealer License Number"
        value={dealerLicense}
        onChange={(e) => setDealerLicense(e.target.value)}
        fullWidth
        margin="normal"
      />

      <TextField
        select
        label="Select Pharmacist ID"
        value={pharmacistId}
        onChange={(e) => setPharmacistId(e.target.value)}
        fullWidth
        margin="normal"
        disabled={loadingPharmacists}
      >
        <MenuItem value="">-- Select Pharmacist ID --</MenuItem>
        {pharmacistList.map((id, index) => (
          <MenuItem key={index} value={id}>
            {id}
          </MenuItem>
        ))}
      </TextField>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSave}
        disabled={saving || !scannedData || !dealerName || !dealerLicense || !pharmacistId}
        sx={{ mt: 2 }}
      >
        {saving ? "Saving..." : "Update QR Info"}
      </Button>

      {message && (
        <Typography variant="body2" color="secondary" mt={2}>
          {message}
        </Typography>
      )}
    </Container>
  );
};

export default DealerDashboard;
