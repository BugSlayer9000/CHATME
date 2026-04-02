import express from "express"
import { protectRoute } from "../middleware/auth.middlewear.js"
import {getUserForSideBar, getMessages, sendMessage} from "../controllers/message.controller.js"

const router = express.Router()

router.get("/users", protectRoute, getUserForSideBar)
router.get("/:id", protectRoute,getMessages)

// send msgs
router.post("/send/:id", protectRoute, sendMessage)

export default router