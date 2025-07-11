import { Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <Box textAlign="center" mt={10}>
      <Typography variant="h4" gutterBottom>
        403 - Unauthorized Access
      </Typography>
      <Typography variant="body1" paragraph>
        You don't have permission to access this page.
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary">
        Return to Home
      </Button>
    </Box>
  );
};

export default Unauthorized;
