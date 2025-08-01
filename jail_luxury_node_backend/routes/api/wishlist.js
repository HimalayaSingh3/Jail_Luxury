import express from "express";
const router = express.Router();


import * as wishlistController from "../../controllers/wishlistController.js";
import { verifyToken } from "../../utils/verifyToken.js";


router.post("/addOrEditWishlist",verifyToken, async (req, res) => {
  console.log("req.user_id",req.user)
    const { payloadObj } = req.body;
    payloadObj.userId  = req.user.user_id
    console.log("payloadObj is :: " + payloadObj);
    const data = await wishlistController.addOrEditWishlist(payloadObj);
    res.send({ status: "success", data });
  
});


router.post("/fetchUserWishlist", verifyToken, async (req, res) => {
  try {
    // Log the request for debugging
    console.log("fetchUserWishlist request received. User:", req.user);

    // Validate the request
    if (!req.user || !req.user.user_id) {
      console.error("Invalid user data in request.");
      return res.status(400).send({ error: "Invalid user data." });
    }

    // Fetch the user's wishlist
    const data = await wishlistController.fetchUserWishlist({ userId: req.user.user_id });

    // Check if data was returned
    if (!data) {
      console.error("No data returned from wishlistController.");
      return res.status(404).send({ error: "Wishlist not found." });
    }

    // Send the response
    res.status(200).send( data );
  } catch (error) {
    // Log the error for debugging
    console.error("Error in fetchUserWishlist route:", error);

    // Send a generic error response
    res.status(500).send({ error: "An error occurred while fetching the wishlist." });
  }
});


router.post("/deleteFromUserWishlist",verifyToken, async (req, res) => {
  console.log("req.user_id",req.user,req.body)
    const { payloadObj } = req.body;
    payloadObj.userId  = req.user.user_id
    console.log("payloadObj is :: " + payloadObj);
    const data = await wishlistController.deleteFromUserWishlist(payloadObj);
    res.send({ status: "success", data });
  });
  


// Export
export default router;
