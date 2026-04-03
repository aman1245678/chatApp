// routes/userRoutes.js
import express from "express";
import User from "../models/User.js";
import { protect } from "../middleware/authMiddleware.js";
import { getMyProfile } from "../controllers/userController.js";

const router = express.Router();
router.get("/me", protect, getMyProfile);
router.get("/", protect, async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user._id } });
  res.json(users);
});

export default router;