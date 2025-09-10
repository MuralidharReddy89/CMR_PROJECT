const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1]; // Bearer <token>
    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

    const decoded = jwt.verify(token, "SECRET_KEY"); // replace SECRET_KEY with env variable if needed
    req.user = decoded; // { id: 'u123', role: 'rep' }
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = auth;
