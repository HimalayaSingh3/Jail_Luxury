import { Router } from "express";
import * as productController from "../../controllers/productController.js";
import * as searchController from "../../controllers/searchController.js";
import { getUserFromToken } from "../../utils/verifyToken.js";

const router = Router();

// Helper function to normalize query parameters
const normalizeParam = (param, defaultValue = null) => {
  if (param =="undefined" || param == "null" || param == undefined || param == null) {
      return null;
  }

  // Check if param is a string and trim it if necessary
  if (typeof param == "string" && param.trim() == "") {
      return defaultValue;
  }
  // Return the param as-is for all other cases
  return param;
};

router.post("/findAllProductsByCatagoryId", async (req, res) => {
  console.log(req.body);
  const { payloadObj } = req.body;
  console.log("payloadObj is ::", payloadObj);
  const data = await productController.findAllProductsByCatagoryId(payloadObj);
  res.send({ status: "success", data });
});

router.get("/findProductsById", async (req, res) => {

  let userId = null;
  try {
    userId = getUserFromToken(req)?.user_id;
  } catch (error) {
    console.error("getUserFromToken error:", error);
    userId = null;
  }

  try {
    console.log(req.query); // Log the query parameters

    // Extract query parameters
    const {
     productName ,
     pid,
     pdid,
    } = req.query;

    // Construct the payload object
    const payloadObj = {
      productName,
      pid,
      pdid,
      userId
    };

    console.log("payloadObj is ::", payloadObj);

    // Call the controller function
    const responseData = await productController.findProductsByPdId(payloadObj);

    // Send the response
    res.status(200).send({ status: "success", responseData });
  } catch (error) {
    console.error("Error in /findProductsByPdId:", error); // Log the error for debugging
    res.status(500).send({ status: "error", message: "Some Internal Error Occurred" });
  }
});


router.get("/findProductsByCategoryName", async (req, res) => {
  try {
    const {
      categoryName,
      colorFilter,
      sizeFilter,
      sortBy,
      sortOrder,
      page,
      limit,
      price,
      gender
    } = req.query;


    let userId = null;
    try {
      userId = getUserFromToken(req)?.user_id;
    } catch (error) {
      console.error("getUserFromToken error:", error);
      userId = null;
    }
    
    if (!normalizeParam(categoryName)) {
      return res.status(400).json({ error: "categoryName is required" });
    }

    console.log("colorFilter", colorFilter, "sizeFilter", sizeFilter);

    const colorArray = normalizeParam(colorFilter) 
      ? colorFilter.split(",").map((item) => parseInt(item, 10)) 
      : null;

    const sizeArray = normalizeParam(sizeFilter) 
      ? sizeFilter.split(",").map((item) => parseInt(item, 10)) 
      : null;

    const priceArray = normalizeParam(price) 
      ? price.split(",").map((item) => parseInt(item)) 
      : null;      

    console.log("colorArray", colorArray, "sizeArray", sizeArray,"priceArray",priceArray);

    const products = await productController.findProductsByCategoryName({
      categoryName: normalizeParam(categoryName),
      colorFilter: colorArray,
      sizeFilter: sizeArray,
      sortBy: normalizeParam(sortBy, "updated_at"),
      sortOrder: normalizeParam(sortOrder, "DESC"),
      page: parseInt(normalizeParam(page, "1"), 10),
      limit: parseInt(normalizeParam(limit, "12"), 10),
      userId,
      priceArray,
      gender: normalizeParam(gender),
    });

    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post("/findAllAvalibaleColorsByPidAndSizeId", async (req, res) => {
  console.log(req.body);
  const { payloadObj } = req.body;
  console.log("payloadObj is ::", payloadObj);
  const responseData =
    await productController.findAllAvalibaleColorsByPidAndSizeId(payloadObj);
  res.send({ status: "success", responseData });
});

router.post("/findAllAvalibaleSizesByPidAndColorId", async (req, res) => {
  console.log(req.body);
  const { payloadObj } = req.body;
  console.log("payloadObj is ::", payloadObj);
  const responseData =
    await productController.findAllAvalibaleSizesByPidAndColorId(payloadObj);
  res.send({ status: "success", responseData });
});


router.get("/findBestSellerByGender", async (req, res) => {
  let userId = null;


  const {
    gender
  } = req.query;
  // Extract user ID from token
  try {
    const user = getUserFromToken(req);
    userId = user?.user_id || null;
  } catch (error) {
    console.error("Error extracting user from token:", error);
    return res.status(401).send({ status: "error", message: "Invalid or expired token" });
  }

  // Validate request body
  if (!req.query || !req.query) {
    return res.status(400).send({ status: "error", message: "Missing payloadObj in request body" });
  }

  console.log("Processed gender:", gender);

  try {
    // Fetch bestseller data
    const responseData = await productController.findBestSellerByGender({gender,userId});
    return res.status(200).json(responseData);
  } catch (error) {
    console.error("Error in findBestSellerByGender:", error);
    res.status(500).send({ status: "error", message: "Internal server error", details: error.message });
  }
});


router.get("/searchByNameColorCategory", async (req, res) => {
  const { userInput, page = 1, limit = 12, color, gender, sortOrder = "", sortBy = "", price } = req.query;

  // Edge Case: Handle missing or invalid userInput
  if (!userInput || typeof userInput !== "string" || userInput.trim() === "") {
    return res.status(400).send({
      status: "error",
      message: "Invalid or missing userInput parameter.",
    });
  }

  try {
    console.log("userInput:", userInput, "color:", color, "normalized color:", normalizeParam(color));

    // Parse colorArray if color is provided
    const colorArray = normalizeParam(color) 
      ? color.split(",").map((item) => parseInt(item, 10))
      : null;
    const priceArray =  normalizeParam(price) 
    ? price.split(",").map((item) => parseInt(item))
    : null;

    console.log("colorArray:", colorArray);

    // Call the search function with userInput and other parameters
    const data = await searchController.searchByNameColorCategory({
      userInput,
      page: parseInt(page),
      limit: parseInt(limit),
      colorArray,
      gender: normalizeParam(gender),
      sortOrder : normalizeParam(sortOrder) ,
      sortBy: normalizeParam(sortBy),
      priceArray
    });

    // Edge Case: Handle no results found
    if (!data || data.length === 0 || data === "Nothing Found") {
      return res.status(404).send({
        status: "success",
        message: "No products found for the given criteria.",
        data: [],
      });
    }

    // Success response
    res.status(200).send(data);
  } catch (error) {
    console.error("Error in /searchByNameColorCategory:", {
      error: error.message,
      userInput,
      color,
      gender,
      page,
      limit,
    });

    // Error response
    res.status(500).send({
      status: "error",
      message: "An error occurred while processing your request.",
    });
  }
});
export default router;
