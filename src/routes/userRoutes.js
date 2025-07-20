const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const {
  getUsers,
  getUserById,
  updatedUser,
  deleteUser,
} = require("../controllers/userController");
const { validate, updatedUserSchema } = require("../utils/validation");

const router = express.Router();

// Admin routes
router.route("/").get(protect, admin, getUsers);

router
  .route("/:id")
  .get(protect, admin, getUserById)
  .patch(protect, admin, validate(updatedUserSchema), updatedUser)
  .delete(protect, admin, deleteUser);

module.exports = router;
