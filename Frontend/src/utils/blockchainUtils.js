import sha256 from "crypto-js/sha256";

// Create a new block
const createBlock = (index, previousHash, data) => {
  const timestamp = new Date().toISOString();
  const hash = calculateHash(index, previousHash, timestamp, data);
  return {
    index,
    timestamp,
    data,
    previousHash,
    hash,
  };
};

// Calculate the hash of a block
const calculateHash = (index, previousHash, timestamp, data) => {
  return sha256(index + previousHash + timestamp + JSON.stringify(data)).toString();
};

// Add a new block to the blockchain
const addBlock = (blockchain, data) => {
  const previousBlock = blockchain[blockchain.length - 1];
  const newBlock = createBlock(blockchain.length, previousBlock ? previousBlock.hash : "0", data);
  return newBlock;
};

export { createBlock, calculateHash, addBlock };