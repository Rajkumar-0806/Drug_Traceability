const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["manufacturer", "dealer", "pharmacist", "customer"],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  manufacturerId: {
    type: String,
    unique: true,
    sparse: true,
  },
  dealerId: {
    type: String,
    unique: true,
    sparse: true,
  },
  pharmacistId: {
    type: String,
    unique: true,
    sparse: true,
  },
  aadhaarNumber: {
    type: String,
    unique: true,
    sparse: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
