import React, { useState } from "react";
import { Box, Typography, Button, Collapse, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [helpOpen, setHelpOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleHelpClick = () => {
    setHelpOpen((prev) => !prev);
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <Box>
      {/* Fixed Navbar */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          backgroundColor: "#00ced1",
          color: "white",
          padding: "10px 20px",
          zIndex: 1300,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button
          onClick={toggleSidebar}
          sx={{
            backgroundColor: "#008b8b",
            color: "white",
            marginRight: "10px",
            minWidth: "40px",
            padding: "6px",
            "&:hover": { backgroundColor: "#005f5f" },
          }}
          aria-label="Toggle sidebar"
        >
          <MenuIcon />
        </Button>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Medicine Verification System
        </Typography>
      </Box>

      {/* Sidebar */}
      <Box
        sx={{
          width: "200px",
          height: "100vh",
          backgroundColor: "#f5f5f5",
          boxShadow: "2px 0 4px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          display: sidebarOpen ? "flex" : "none",
          flexDirection: "column",
          gap: 2,
          position: "fixed",
          top: "70px", // height of navbar
          left: 0,
          zIndex: 1200,
        }}
      >
        {/* Navigation Links */}
        <Button component={Link} to="/" variant="text" sx={{ color: "#008b8b" }}>
          Home
        </Button>
        <Button component={Link} to="/medicine-details" variant="text" sx={{ color: "#008b8b" }}>
          Medicine Details
        </Button>
        <Button component={Link} to="/purchase-medicine" variant="text" sx={{ color: "#008b8b" }}>
          Purchase Medicine
        </Button>

        {/* Help and Support Section */}
        <Button onClick={handleHelpClick} variant="text" sx={{ color: "#008b8b" }}>
          Help and Support
        </Button>
        <Collapse in={helpOpen}>
          <Box
            sx={{
              pl: 2,
              backgroundColor: "#e0f7fa",
              borderRadius: "5px",
              mt: 1,
            }}
          >
            <List>
              <ListItem>
                <ListItemText
                  primary="Helpline Number"
                  secondary="+91 12345 67890"
                  sx={{
                    "& .MuiTypography-root": { color: "#00ced1" },
                    "& .MuiTypography-body2": { color: "#00ced1" },
                  }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Email Support"
                  secondary="support@medicineverify.com"
                  sx={{
                    "& .MuiTypography-root": { color: "#00ced1" },
                    "& .MuiTypography-body2": { color: "#00ced1" },
                  }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="24/7 Customer Support"
                  secondary="We are here to help you anytime!"
                  sx={{
                    "& .MuiTypography-root": { color: "#00ced1" },
                    "& .MuiTypography-body2": { color: "#00ced1" },
                  }}
                />
              </ListItem>
            </List>
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};

export default Navbar;
