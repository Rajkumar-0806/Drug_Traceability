import React, { useState } from "react";
import { Button, CircularProgress, Typography, Box } from "@mui/material";
import FingerprintIcon from "@mui/icons-material/Fingerprint";

const FingerprintScanner = ({ onCapture }) => {
  const [scanning, setScanning] = useState(false);

  const handleScan = async () => {
    setScanning(true);
    try {
      // Simulate fingerprint capture
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onCapture();
    } finally {
      setScanning(false);
    }
  };

  return (
    <Box textAlign="center">
      <Button
        variant="contained"
        color="primary"
        startIcon={scanning ? <CircularProgress size={20} color="inherit" /> : <FingerprintIcon />}
        onClick={handleScan}
        disabled={scanning}
      >
        {scanning ? "Scanning..." : "Scan Fingerprint"}
      </Button>
      <Typography variant="caption" display="block" mt={1}>
        Place your finger on the scanner
      </Typography>
    </Box>
  );
};

export default FingerprintScanner;