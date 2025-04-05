const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const jobRoutes = require("./routes/jobRoutes");
const userRoutes = require("./routes/userRoutes");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:3000", // Allow frontend access during local dev
  credentials: true
}));
app.use(express.json());

// MongoDB connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1); // Stop the server if DB connection fails
  }
};

connectDB(); // Call it here

// Test route
app.get("/", (req, res) => {
  res.send("<h1>Hello, World!</h1>");
});

// Routes
app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
