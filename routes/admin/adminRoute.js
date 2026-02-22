const express = require("express");
const router = express.Router();
const { authMiddleware, authorized } = require("../../middleware/auth/auth");
const {adminController} = require("../../controllers/admin/adminController")

router.get('/dashboard',authMiddleware,authorized(["admin"]),adminController)


module.exports=router 