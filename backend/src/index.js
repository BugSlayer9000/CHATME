import express from "express"
import authRoutes from "./routes/auth.routes.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import messageRoutes from "./routes/message.route.js"

import { connectDB } from "./lib/db.js"
dotenv.config()


const app  = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

const PORT = process.env.PORT

app.listen(5001, () => {
    console.log("Server Started on port: " + PORT);
    connectDB()
    
})