
import apiRoutes from "./api/index.js"; // Import API routes
import express from "express";
const router = express.Router();

router.use("/api", apiRoutes);

router.use((req, res) => {
  res.status(404).send("<h1>Wrong Route!</h1>");
});

// Export
export default router;
