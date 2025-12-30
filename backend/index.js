import 'dotenv/config';
import express from "express";
import cors from "cors";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import bookingRouter from "./routes/booking.route.js";
import listingRouter from "./routes/listing.route.js";
import userRouter from "./routes/user.route.js";
import wishlistRouter from './routes/wishlist.route.js';
import adminRouter from './routes/admin.route.js';


const PORT = process.env.PORT || 5000

let app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))


app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/booking", bookingRouter)
app.use("/api/listing", listingRouter)
app.use("/api/wishlist", wishlistRouter)
app.use("/api/admin", adminRouter)


app.get("/", (req, res) => {
    res.send("hello from server")
})




app.listen(PORT, () => {
    connectDb()
    console.log("Server started at port ", PORT)
})