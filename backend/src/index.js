import express from "express"
import authRoutes from "./routes/auth.routes.js"


const app  = express()

app.use("/api/auth", authRoutes)


app.listen(5001, () => {
    console.log("Server Started on port 5001");
    
})