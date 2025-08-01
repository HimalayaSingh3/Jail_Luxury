import express from "express";
import { verifyToken } from "../../utils/verifyToken.js";
import * as usersController from "../../controllers/usersController.js";
import { handleRequest } from "../../utils/handleRequest.js";

const router = express.Router();


// ✅ Add or Edit User Address
router.post("/addOrEditUserAddress", verifyToken, async (req, res) => {
  await handleRequest(req, res, usersController.addOrEditUserAddress);
});

// ✅ Delete User Address
router.post("/deleteUserAddress", verifyToken, async (req, res) => {
  await handleRequest(req, res, usersController.deleteUserAddress);
});

// ✅ Get User Addresses
router.post("/getUserAddresses", verifyToken, async (req, res) => {
    console.log("req.user",req.user)
  await handleRequest(req, res, usersController.getUserAddresses);
});

router.post("/updateUserData", verifyToken, async (req, res) => {
    console.log("req.user",req.user)
  await handleRequest(req, res, usersController.updateUserData);
});

export default router;