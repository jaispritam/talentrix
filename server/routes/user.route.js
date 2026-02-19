import express from "express";
import {
  becomeSeller,
  deleteUser,
  getUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", getUser);
router.put("/become-seller", verifyToken, becomeSeller);

export default router;
