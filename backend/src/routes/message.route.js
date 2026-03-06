import express from "express"
import { protectRoute } from "../middleware/auth.middlewear.js"
import {getUserForSideBar, getMessages} from "../controllers/message.controller.js"

const router = express.Router()

router.get("/user", protectRoute, getUserForSideBar)
router.get("/:id", protectRoute,getMessages)

export default router