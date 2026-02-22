require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json());
app.get("/test", (req, res) => {
  res.send("API is working");
});

 
app.use("/api",require("./routes/auth/authRoute"))
app.use("/api/admin", require("./routes/admin/adminRoute"));
app.use("/api/teacher", require("./routes/teacher/teacherRoute"));



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
