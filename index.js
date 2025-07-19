const express = require("express");
const connectDB = require("./src/config/db");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", require("./src/routes/authRoutes"));

// Base route
app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 8000;
app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
});
