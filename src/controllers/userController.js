const User = require("../models/userModel");

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500);
    res.json({
      message: error.message,
      stack: process.env.NODE_ENV === "production" ? null : error.stack,
    });
  }
};

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(res.statusCode === 200 ? 500 : res.statusCode);
    res.json({
      message: error.message,
      stack: process.env.NODE_ENV === "production" ? null : error.stack,
    });
  }
};

// @desc    Update User
// @route   GET /api/users/:id
// @access  Private/Admin
const updatedUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;

      if (req.body.address) {
        user.address = {
          ...user.address,
          ...req.body.address,
        };
      }

      user.isAdmin =
        req.body.isAdmin != undefined ? req.body.isAdmin : user.isAdmin;
      user.isRestaurantOwner =
        req.body.isRestaurantOwner != undefined
          ? req.body.isRestaurantOwner
          : user.isRestaurantOwner;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address,
        isAdmin: updatedUser.isAdmin,
        isRestaurantOwner: updatedUser.isRestaurantOwner,
      });
    } else {
      res.status(404);
      throw Error("User not found");
    }
  } catch (error) {
    res.status(res.statusCode == 200 ? 500 : res.statusCode);
    res.json({
      message: error.message,
      stack: process.env.NODE_ENV === "production" ? null : error.stack,
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin

const deleteUser = async (req, res) => {
  try {
    const user = User.findById(req.params.id);

    if (user) {
      await user.deleteOne();
      res.json({ message: "User removed." });
    } else {
      res.status(404);
      throw new Error("User not found.");
    }
  } catch (error) {
    res.status(res.statusCode == 200 ? 500 : res.statusCode);
    res.json({
      message: error.message,
      stack: process.env.NODE_ENV == "production" ? null : error.stack,
    });
  }
};
module.exports = { getUsers, getUserById, updatedUser, deleteUser };
