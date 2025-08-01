import express from "express";
const router = express.Router();


import * as filterController from "../../controllers/filterController.js";
router.post("/getSizeFilterByCatagory", async (req, res) => {
  // find all categories including its associated Product
  const { categoryName } = req.body;
  console.log("categoryName is :: " + categoryName);
  const data = await filterController.getSizeFilterByCategory(categoryName);
  res.send({ status: "success", data });
});

router.get("/getAllColors", async (req, res) => {
  // find all categories including its associated Product
  console.log("get call colors")
  const data = await filterController.getAllColors();
  res.send({ status: "success", data });
});

// Export
export default router;
