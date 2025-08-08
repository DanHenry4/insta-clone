const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token received:", token); // Add this line
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded); // Add this line
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT error:", err); // Add this line
    res.status(401).json({ message: "Post - Invalid token" });
  }
};