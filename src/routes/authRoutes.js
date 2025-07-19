const express = require("express");
const {
  loginUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/authController");
const {
  validate,
  registerSchema,
  loginSchema,
  updatedUserSchema,
} = require("../utils/validation");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Public routes
router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);

// Protected routes
router
  .route("/profile")
  .get(protect, getUserProfile)
  .patch(protect, validate(updatedUserSchema), updateUserProfile);

module.exports = router;
