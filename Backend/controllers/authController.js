const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { hashPassword, comparePassword } = require("../helpers/auth");

// Test endpoint
const test = (req, res) => {
  res.json({ message: "Test is working" });
};

const registerUser = async (req, res) => {
  try {
    const {
      role,
      name,
      password,
      manufacturerId,
      dealerId,
      pharmacistId,
      aadhaarNumber,
    } = req.body;

    if (!name || !role || !password) {
      return res.status(400).json({ error: "Name, role, and password are required" });
    }

    // Normalize role to lowercase
    const normalizedRole = role.toLowerCase();

    let newUser = {
      role: normalizedRole,
      name,
      password: await hashPassword(password),
    };

    let searchQuery = { role: normalizedRole };

    switch (normalizedRole) {
      case "manufacturer":
        if (!manufacturerId)
          return res.status(400).json({ error: "Manufacturer ID is required" });
        newUser.manufacturerId = manufacturerId.trim();
        searchQuery.manufacturerId = manufacturerId.trim();
        break;
      case "dealer":
        if (!dealerId)
          return res.status(400).json({ error: "Dealer ID is required" });
        newUser.dealerId = dealerId.trim();
        searchQuery.dealerId = dealerId.trim();
        break;
      case "pharmacist":
        if (!pharmacistId)
          return res.status(400).json({ error: "Pharmacist ID is required" });
        newUser.pharmacistId = pharmacistId.trim();
        searchQuery.pharmacistId = pharmacistId.trim();
        break;
      case "customer":
        if (!aadhaarNumber)
          return res.status(400).json({ error: "Aadhaar Number is required" });
        newUser.aadhaarNumber = aadhaarNumber.trim();
        searchQuery.aadhaarNumber = aadhaarNumber.trim();
        break;
      default:
        return res.status(400).json({ error: "Invalid role provided" });
    }

    const existingUser = await User.findOne(searchQuery);
    if (existingUser) {
      return res.status(400).json({ error: "User with provided ID already exists" });
    }

    const user = await User.create(newUser);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ Registration error:", error);
    if (error.code === 11000) {
      return res.status(400).json({
        error: `Duplicate field value entered: ${JSON.stringify(error.keyValue)}`,
      });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Server error during registration" });
  }
};

const loginUser = async (req, res) => {
  try {
    let { role, manufacturerId, dealerId, pharmacistId, aadhaarNumber, password } = req.body;

    if (!role || !password) {
      return res.status(400).json({ error: "Role and password are required" });
    }

    // Normalize role
    role = role.toLowerCase();

    let user;

    switch (role) {
      case "manufacturer":
        if (!manufacturerId)
          return res.status(400).json({ error: "Manufacturer ID required" });
        user = await User.findOne({ role, manufacturerId: manufacturerId.trim() });
        break;
      case "dealer":
        if (!dealerId)
          return res.status(400).json({ error: "Dealer ID required" });
        user = await User.findOne({ role, dealerId: dealerId.trim() });
        break;
      case "pharmacist":
        if (!pharmacistId)
          return res.status(400).json({ error: "Pharmacist ID required" });
        user = await User.findOne({ role, pharmacistId: pharmacistId.trim() });
        break;
      case "customer":
        if (!aadhaarNumber)
          return res.status(400).json({ error: "Aadhaar Number required" });
        user = await User.findOne({ role, aadhaarNumber: aadhaarNumber.trim() });
        break;
      default:
        return res.status(400).json({ error: "Invalid role" });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res
      .cookie("token", token, { httpOnly: true, sameSite: "lax" })
      .json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          role: user.role,
          name: user.name,
          manufacturerId: user.manufacturerId,
          dealerId: user.dealerId,
          pharmacistId: user.pharmacistId,
          aadhaarNumber: user.aadhaarNumber,
        },
      });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    console.error("❌ Profile error:", error);
    res.status(500).json({ error: "Server error while fetching profile" });
  }
};

module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile,
};
