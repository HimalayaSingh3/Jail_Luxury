import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

export const authenticate = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Sequelize uses findByPk, not findById
    const user = await User.findByPk(decoded.userId, {
      attributes: { exclude: ["password"] }, // Exclude password manually
    });

    if (!user) {
      res.status(401);
      throw new Error("User not found.");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token failed.");
  }
});

export const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as an admin." });
  }
};
