import express from "express";
const router = express.Router();

import * as cartController from "../../controllers/cartController.js";
import { verifyToken } from "../../utils/verifyToken.js";

router.post("/addOrEditCart",verifyToken, async (req, res) => {
    console.log("req.user_id",req.user,req.body)
    console.log(req.body);
    const { payloadObj } = req.body;
    console.log("payloadObj is :: " + payloadObj);
    payloadObj.userId =  req.user.user_id;
    const data = await cartController.addOrEditCart(payloadObj);
    res.send({ status: "success", data });
});


router.post("/fetchUserCart", verifyToken, async (req, res) => {
  try {
    // Log the request for debugging
    console.log("fetchUserCart request received. User:", req.user);

    // Validate the request
    if (!req.user || !req.user.user_id) {
      console.error("Invalid user data in request.");
      return res.status(400).send({ error: "Invalid user data." });
    }

    // Fetch the user's wishlist
    const data = await cartController.fetchUserCart({ userId: req.user.user_id });

    // Check if data was returned
    if (!data) {
      console.error("No data returned from cartController.");
      return res.status(404).send({ error: "Wishlist not found." });
    }

    // Send the response
    res.status(200).send( data );
  } catch (error) {
    // Log the error for debugging
    console.error("Error in fetchUserCart route:", error);

    // Send a generic error response
    res.status(500).send({ error: "An error occurred while fetching the cart." });
  }
});




router.post("/deleteFromUserCart",verifyToken, async (req, res) => {
    // find all categories including its associated Product
    console.log("req.user_id",req.user,req.body)
    const { payloadObj } = req.body;
    payloadObj.userId  = req.user.user_id
    console.log("payloadObj is :: " + payloadObj);
    const data = await cartController.deleteFromUserCart(payloadObj);
    res.send({ status: "success", data });
});

// Export
export default router;