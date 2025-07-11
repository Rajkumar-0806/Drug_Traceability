import React, { useContext } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MedicoChatbot from "../components/MedicoChatbot/MedicoChatbot";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleNavigation = (rolePath) => {
    if (user) {
      if (user.role === rolePath.split('/')[1] || user.role === 'admin') {
        navigate(rolePath);
      } else {
        alert(`You need to be logged in as a ${rolePath.split('/')[1]} to access this page`);
      }
    } else {
      navigate('/login', { state: { intendedRole: rolePath.split('/')[1] } });
    }
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
    navigate('/');
  };

  return (
    <Container sx={{ position: "relative", minHeight: "100vh", paddingTop: "100px" }}>
      {/* Auth Status Section */}
      {user && (
        <Box textAlign="right" mt={2}>
          <Typography variant="subtitle1" display="inline" mr={2}>
            Logged in as: {user.name} ({user.role})
          </Typography>
          <Button 
            variant="outlined" 
            size="small"
            onClick={handleLogout}
            sx={{ color: "#00ced1", borderColor: "#00ced1" }}
          >
            Logout
          </Button>
        </Box>
      )}

      {/* Main Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          minHeight: "60vh",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Welcome to the Medicine Verification System
        </Typography>

        <Box sx={{ mt: 3 }}>
          {['manufacturer', 'dealer', 'pharmacist', 'customer'].map((role) => (
            <Button
              key={role}
              variant="contained"
              sx={{
                backgroundColor: "#00ced1",
                color: "white",
                padding: "15px 30px",
                fontSize: "16px",
                m: 1,
                "&:hover": { backgroundColor: "#008b8b" },
                textTransform: 'capitalize'
              }}
              onClick={() => handleNavigation(`/${role}`)}
            >
              {role}
            </Button>
          ))}

          {user?.role === 'admin' && (
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#ff6b6b",
                color: "white",
                padding: "15px 30px",
                fontSize: "16px",
                m: 1,
                "&:hover": { backgroundColor: "#ff4757" },
              }}
              onClick={() => navigate('/admin')}
            >
              Admin Dashboard
            </Button>
          )}
        </Box>

        <Box mt={4}>
          {!user ? (
            <>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                sx={{ mr: 2, color: "#00ced1", borderColor: "#00ced1" }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                variant="outlined"
                sx={{ color: "#00ced1", borderColor: "#00ced1" }}
              >
                Register
              </Button>
            </>
          ) : (
            <Button
              component={Link}
              to="/dashboard"
              variant="outlined"
              sx={{ color: "#00ced1", borderColor: "#00ced1" }}
            >
              My Dashboard
            </Button>
          )}
        </Box>
      </Box>

      {/* Chatbot */}
      <Box
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 1000,
          animation: "floatUp 0.5s ease-out forwards",
          "@keyframes floatUp": {
            from: {
              transform: "translateY(100px)",
              opacity: 0,
            },
            to: {
              transform: "translateY(0)",
              opacity: 1,
            },
          },
          "@media (max-width: 768px)": {
            right: 16,
            bottom: 16,
          },
        }}
      >
        <MedicoChatbot />
      </Box>
    </Container>
  );
};

export default Home;
