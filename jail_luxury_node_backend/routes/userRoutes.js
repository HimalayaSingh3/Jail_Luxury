import express from "express";
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
} from "../controllers/userController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public Routes
router.post("/", createUser); // Register new user
router.post("/auth", loginUser); // Login
router.post("/logout", logoutCurrentUser); // Logout

// Authenticated User Routes
router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile) // Get own profile
  .put(authenticate, updateCurrentUserProfile); // Update own profile

// Admin Routes
router.route("/").get(authenticate, authorizeAdmin, getAllUsers); // Get all users (admin only)

router
  .route("/:id")
  .get(authenticate, authorizeAdmin, getUserById) // Get user by ID
  .put(authenticate, authorizeAdmin, updateUserById) // Update user by ID
  .delete(authenticate, authorizeAdmin, deleteUserById); // Delete user

export default router;
