const express = require('express');
// const Ad = require('./models/Ad');
// const upload = require('./utils/upload');
const router = express.Router();

// POST /api/admin/upload-ad
router.post('/api/admin/upload-ad', upload.single('image'), async (req, res) => {
  try {
    const { title, description, price } = req.body;
    if (!req.file) return res.status(400).json({ error: 'Image is required' });

    const newAd = await Ad.create({
      title,
      description,
      price,
      imageUrl: `/uploads/${req.file.filename}`,
    });

    res.status(201).json({ message: 'Ad uploaded successfully', ad: newAd });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;
