import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "secondary.main",
        color: "white",
        textAlign: "center",
        padding: "1rem",
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
    >
      <Typography variant="body1">
        &copy; {new Date().getFullYear()} Medicine Verification System. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;