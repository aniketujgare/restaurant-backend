const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");
const { notFound, errorHandler } = require("./src/middleware/errorMiddleware");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/users", require("./src/routes/userRoutes"));

// Base route
app.get("/", (req, res) => {
  res.send("API is running...");
});
// Error handling middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
});
