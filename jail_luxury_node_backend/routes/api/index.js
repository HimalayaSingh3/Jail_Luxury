// Import
import express from "express";
import itemsCategory from "./itemsCategory.js";
import productCategory from "./products.js";
import wishlist from "./wishlist.js";
import filters from "./filters.js";
import cart from "./cart.js";
import users from "./users.js";
import payments from "./payments.js";

const router = express.Router();

router.use("/items", itemsCategory);
router.use("/products", productCategory);
router.use("/wishlist", wishlist);
router.use("/filters", filters);
router.use("/cart", cart);
router.use("/users", users);
router.use("/payments",payments);

// Export
export default router;