import express from "express";
import { cancelBooking, createBooking, getUserBookings, updateBookingStatus } from "../controllers/booking.controller.js";
import isAuth from "../middleware/isAuth.js";

const bookingRouter = express.Router();

bookingRouter.post("/", isAuth, createBooking);

bookingRouter.get("/my", isAuth, getUserBookings);
bookingRouter.patch("/:id/cancel", isAuth, cancelBooking );
bookingRouter.patch("/:id/status", isAuth, updateBookingStatus);


export default bookingRouter;
