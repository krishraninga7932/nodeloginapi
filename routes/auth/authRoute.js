const express = require("express");
const router = express.Router();
const { register,login } = require("../../controllers/auth/authController");

console.log("Auth route loaded"); // 👈 add this

router.post("/register", register);
router.post("/login", login);

module.exports = router;
 