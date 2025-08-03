import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js"; // Make sure this is configured correctly

import {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
} from "../controllers/categoryController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "categories",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

// 🟢 POST: Create category with image upload
router.post(
  "/",
  authenticate,
  authorizeAdmin,
  upload.single("image"), // handles image upload
  createCategory
);

// 🟡 PUT: Update category (you can later add image support here too)
router.put("/:categoryId", authenticate, authorizeAdmin, updateCategory);

// 🔴 DELETE: Remove category
router.delete("/:categoryId", authenticate, authorizeAdmin, removeCategory);

// 📋 GET: List all categories
router.get("/categories", listCategory);

// 🔍 GET: Read single category
router.get("/:id", readCategory);

export default router;
