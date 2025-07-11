import React, { useState } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { addBlock } from "../utils/blockchainUtils";

const Blockchain = () => {
  const [blockchain, setBlockchain] = useState([]);

  const handleAddBlock = () => {
    const newBlock = addBlock(blockchain, { transaction: "Sample Transaction" });
    setBlockchain([...blockchain, newBlock]);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Blockchain
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAddBlock} sx={{ mb: 2 }}>
        Add Block
      </Button>
      {blockchain.map((block, index) => (
        <Box key={index} sx={{ border: "1px solid #00ced1", borderRadius: "5px", padding: "10px", mb: 2 }}>
          <Typography variant="body1">
            <strong>Block {block.index}:</strong>
          </Typography>
          <Typography variant="body2">
            <strong>Timestamp:</strong> {block.timestamp}
          </Typography>
          <Typography variant="body2">
            <strong>Data:</strong> {JSON.stringify(block.data)}
          </Typography>
          <Typography variant="body2">
            <strong>Previous Hash:</strong> {block.previousHash}
          </Typography>
          <Typography variant="body2">
            <strong>Hash:</strong> {block.hash}
          </Typography>
        </Box>
      ))}
    </Container>
  );
};

export default Blockchain;
