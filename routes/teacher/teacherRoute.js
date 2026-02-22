const express = require("express");
const router = express.Router();

const { authMiddleware, authorized } = require("../../middleware/auth/auth");
const {
  addTeacher,
    getTeachers,
  //   updateTeacher,
    deleteTeacher,
} = require("../../controllers/teacher/teacherController");

router.post("/add", authMiddleware, authorized(["admin"]), addTeacher);
router.get("/teacherlist", authMiddleware, authorized(["admin"]), getTeachers);
router.delete("/delete/:id", authMiddleware, authorized(["admin"]), deleteTeacher);

module.exports = router;
