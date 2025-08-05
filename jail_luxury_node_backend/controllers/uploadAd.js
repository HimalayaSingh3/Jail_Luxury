const express = require("express");
const router = express.Router();
const upload = require("../utils/upload");
const Ad = require("../models/Ad");
const cloudinary = require("../config/cloudinary");

router.post(
  "/api/admin/upload-ad",
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file)
        return res.status(400).json({ error: "Image is required" });

      const cloudResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "ads",
      });

      // Save to DB
      const newAd = await Ad.create({
        image: req.file.filename,
        imageUrl: cloudResult.secure_url,
      });

      res.status(201).json({ message: "Ad uploaded successfully", ad: newAd });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Upload failed" });
    }
  }
);

module.exports = router;
