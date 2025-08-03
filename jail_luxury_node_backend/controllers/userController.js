import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

// @desc    Register new user
const createUser = asyncHandler(async (req, res) => {
  const { username, email, password, isAdmin } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the inputs.");
  }

  const userExists = await User.findOne({ where: { email } });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
    isAdmin: isAdmin || false,
  });

  createToken(res, newUser.id);

  res.status(201).json({
    _id: newUser.id,
    username: newUser.username,
    email: newUser.email,
    isAdmin: newUser.isAdmin,
  });
});

// @desc    Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (user && (await bcrypt.compare(password, user.password))) {
    createToken(res, user.id);
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Logout user
const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

// @desc    Get all users (admin only)
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll({ attributes: { exclude: ["password"] } });
  res.json(users);
});

// @desc    Get current user profile
const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id);

  if (user) {
    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update current user profile
const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id);

  if (user) {
    const updates = {
      username: req.body.username || user.username,
      email: req.body.email || user.email,
    };

    if (req.body.password) {
      updates.password = await bcrypt.hash(req.body.password, 10);
    }

    await user.update(updates);

    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Delete user by ID (admin only)
const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete admin user");
    }

    await user.destroy();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by ID (admin only)
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ["password"] },
  });

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user by ID (admin only)
const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (user) {
    await user.update({
      username: req.body.username || user.username,
      email: req.body.email || user.email,
      isAdmin: req.body.isAdmin ?? user.isAdmin,
    });

    res.json({
      _id: user.id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
};
