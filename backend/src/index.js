import express from "express"
import authRoutes from "./routes/auth.routes.js"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js"

dotenv.config()
const app  = express()

app.use("/api/auth", authRoutes)

const PORT = process.env.PORT

app.listen(5001, () => {
    console.log("Server Started on port: " + PORT);
    connectDB()
    
})