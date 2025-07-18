const express = require("express");
const { loginUser, registerUser } = require("../controllers/authController");
const {
  validate,
  registerSchema,
  loginSchema,
} = require("../utils/validation");

const router = express.Router();

// Public routes
router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);

module.exports = router;
