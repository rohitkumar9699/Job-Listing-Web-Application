const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const connectDB = require("./config/db");
const jobRoutes = require("./routes/jobRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json()); // 💥 Required for req.body parsing

connectDB(); // 💥 Connect to MongoDB

// Routes
app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("<h1>API is running</h1>");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
