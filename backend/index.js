import 'dotenv/config';
import express from "express";
import connectDb from "./config/db.js";
import authRouter from "./routes/AuthRoute.js";
import cookieParser from "cookie-parser";
import bookingRouter from "./routes/BookingRoute.js";
import listingRouter from "./routes/ListingRoute.js";
import userRouter from "./routes/UserRoute.js";
import wishlistRouter from './routes/WishlistRoute.js';
import adminRouter from './routes/AdminRoute.js';


const PORT = process.env.PORT || 6000

let app = express()
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter )
app.use("/api/booking", bookingRouter)
app.use("/api/wishlist", wishlistRouter)
app.use("/api/admin", adminRouter)


app.get("/",(req,res)=>{
    res.send("hello from server")
})




app.listen(PORT,()=>{
    connectDb()
    console.log("Server started at port ", PORT)
})