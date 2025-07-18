const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public

const registerUser = async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    // Create a new user
    const user = await User.create({ name, email, password, phone, address });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        isAdmin: user.isAdmin,
        isRestaurantOwner: user.isRestaurantOwner,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(res.statusCode == 200 ? 500 : res.statusCode);
    res.json({
      message: error.message,
      stack: process.env.NODE_ENV === "production" ? null : error.stack,
    });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    //Find user by email
    const user = await User.findOne({ email }).select("+password");
    // Check if user exists and password matches
    if (user && user.matchPassword(password)) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        isAdmin: user.isAdmin,
        isRestaurantOwner: user.isRestaurantOwner,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw Error("Invalid email or password");
    }
  } catch (error) {
    res.status(res.statusCode == 200 ? 500 : res.statusCode);
    res.json({
      message: error.message,
      stack: process.env.NODE_ENV === "production" ? null : error.stack,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
