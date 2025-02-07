import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js"; 
import { getMessage, getUsersForSidebar } from "../controllers/message.controller.js"; 
import { sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/user", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessage);
router.get("/send/:id", protectRoute, sendMessage);

export default router;
