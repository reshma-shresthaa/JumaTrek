import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import bookingRouter from "./routes/booking.route.js";
import listingRouter from "./routes/listing.route.js";
import userRouter from "./routes/user.route.js";
dotenv.config();

const PORT = process.env.PORT || 6000

let app = express()
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter )
app.use("/api/booking", bookingRouter)
app.use("/api/listing", listingRouter)


app.get("/",(req,res)=>{
    res.send("hello from server")
})

app.listen(PORT,()=>{
    connectDb()
    console.log("Server started at port ", PORT)
})