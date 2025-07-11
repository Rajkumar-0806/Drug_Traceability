import React, { useState } from "react";
import { Box, Typography, Container, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";

const PurchaseMedicine = () => {
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("creditCard");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Purchase Details:", { quantity, paymentMethod });
    alert("Medicine purchased successfully!");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Purchase Medicine
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <TextField
          label="Payment Method"
          select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          SelectProps={{ native: true }}
          required
        >
          <option value="creditCard">Credit Card</option>
          <option value="debitCard">Debit Card</option>
          <option value="upi">UPI</option>
          <option value="cash">Cash</option>
        </TextField>
        <Button type="submit" variant="contained" color="primary">
          Confirm Purchase
        </Button>
        <Button variant="outlined" component={Link} to="/medicine-details">
          Back to Medicine Details
        </Button>
      </Box>
    </Container>
  );
};

export default PurchaseMedicine;