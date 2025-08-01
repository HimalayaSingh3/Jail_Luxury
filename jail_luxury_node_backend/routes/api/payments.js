import express from "express";
import { verifyToken } from "../../utils/verifyToken.js";
import { handleRequest } from "../../utils/handleRequest.js";
import * as paymentController from "../../controllers/paymentController.js";

const router = express.Router();

// ✅ checkout Route
router.post("/checkout", verifyToken, async (req, res) => {
  try {
    await handleRequest(
      req,
      res,
      paymentController.checkout
    );
  } catch (error) {
    res.status(500).send({ status: "failed" });
  }
});

// ✅ verification route
router.post("/verification", verifyToken, async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
      }
      try {
        await handleRequest(req, res, paymentController.verification);
      } catch (error) {
        res.status(500).send({ status: "failed" });
      }

});

export default router;
