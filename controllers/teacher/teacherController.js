const User = require("../../model/schema");
const bcrypt = require("bcrypt");

exports.addTeacher = async (req, res) => {
  const { username, name, email, password } = req.body;
  if (!username || !name || !email || !password) {
    return res.status(400).json({ msg: "All fields required" });
  }

  const exist = await User.findOne({ email });
  if (exist) {
    return res.status(400).json({ msg: "Teacher already exists" });
  }

  const usernameExist = await User.findOne({ username });
  if (usernameExist) {
    return res.status(400).json({ msg: "Teacher already registered" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    ...req.body,
    password: hashedPassword,
    role: "teacher",
  });
  res.status(201).json({
    msg: "Teacher added successfully",
  });
};

exports.getTeachers = async (req, res) => {
  const teachers = await User.find({ role: "teacher" }).select("-password");
  res.json(teachers);
};

exports.deleteTeacher = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ msg: "Teacher deleted" });
};
