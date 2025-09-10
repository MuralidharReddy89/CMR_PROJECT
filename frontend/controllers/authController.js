const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Helper to generate custom user ID
async function generateUserId() {
  const lastUser = await User.findOne({}).sort({ id: -1 }).exec();
  if (!lastUser) return "u001";
  const lastNum = parseInt(lastUser.id.slice(1));
  return `u${String(lastNum + 1).padStart(3, "0")}`;
}

// Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Email exists" });

    const id = await generateUserId();
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ id, name, email, password: hashedPassword, role });
    await user.save();

    const token = jwt.sign({ id: user.id, role: user.role }, "SECRET_KEY", { expiresIn: "1d" });
    res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, role: user.role }, "SECRET_KEY", { expiresIn: "1d" });
    res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
