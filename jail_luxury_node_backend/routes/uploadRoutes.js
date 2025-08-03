// routes/uploadRoutes.js
import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

// Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ecommerce_products", // optional folder name in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 800, height: 800, crop: "limit" }],
  },
});

const upload = multer({ storage });

// Single image upload
router.post("/", upload.single("image"), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).send({ message: "No image file uploaded" });
  }

  res.status(200).send({
    message: "Image uploaded successfully",
    imageUrl: req.file.path, // Cloudinary URL
    publicId: req.file.filename, // Useful if you want to delete the image later
  });
});

export default router;
