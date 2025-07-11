const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, {}, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: `Access denied. Role (${req.user.role}) is not authorized`,
      });
    }
    next();
  };
};

module.exports = { authenticate, authorize };
