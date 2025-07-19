const express = require("express");
const {
  loginUser,
  registerUser,
  getUserProfile,
} = require("../controllers/authController");
const {
  validate,
  registerSchema,
  loginSchema,
} = require("../utils/validation");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Public routes
router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);

// Protected routes
router.get("/profile", protect, getUserProfile);

module.exports = router;
