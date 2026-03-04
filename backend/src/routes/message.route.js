import express from "express"
import { protectRoute } from "../middleware/auth.middlewear.js"
import {getUserForSideBar} from "../controllers/message.controller.js"

const router = express.Router()

router.get("/user", protectRoute, getUserForSideBar)

export default router