const User = require("../../model/schema");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../utils/jwt");

exports.register = async (req, res) => {
  try {
    const { username, name, email, password } = req.body;
    if (!username || !name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    const usernameExist = await User.findOne({ username });
    if (usernameExist) {
      return res.status(400).json({ msg: "Username already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      ...req.body,
      password: hashedPassword,
    });
    res.status(201).json({
      msg: "Registration successful, please login",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }
 
  //  Token
  const token = generateToken({ id: user.id, role: user.role });
  return res.status(201).json({
    message: "Login Successfull",
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
};
