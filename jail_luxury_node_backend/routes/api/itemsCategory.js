import express from "express";
import * as itemsController from "../../controllers/itemsController.js";

const router = express.Router();

router.get("/findCategoryById", async (req, res) => {
  // Find category by ID including its associated Product
  const { catagoryId } = req.query;
  console.log("catagoryId is :: " + catagoryId);
  const data = await itemsController.findCatagoryById(catagoryId);
  res.send({ status: "success", data });
});

router.get("/getAllCategories", async (req, res) => {
  // Find all categories including their associated Products
  const data = await itemsController.getAllCategories();
  res.send({ status: "success", data });
});

// Export
export default router;