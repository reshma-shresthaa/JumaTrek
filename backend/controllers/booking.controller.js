import Booking from "../model/booking.model.js";
import { sendBookingConfirmationEmail } from "../utils/emailService.js";
export const createBooking = async (req, res) => {
    try {       
        console.log("Received booking data:", req.body);
       
        const { trek, ...otherData } = req.body;
        const bookingData = {
            ...otherData,
            trekName: trek 
        };
         if (req.userId) {
            bookingData.user = req.userId;
        }

        const newBooking = new Booking(bookingData);
        const savedBooking = await newBooking.save();
        sendBookingConfirmationEmail(savedBooking).catch(err => {
            console.error("Failed to send confirmation email:", err);
        });
        res.status(201).json({
            success: true,
            message: "Booking request submitted successfully!",
            booking: savedBooking
        });
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create booking. Please try again.",
            error: error.message
        });
    }
};

export const getUserBookings = async (req, res) => {
    try {
        const userId = req.userId; 
        const bookings = await Booking.find({ user: userId }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            bookings
        });
    } catch (error) {
        console.error("Error fetching user bookings:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch bookings.",
            error: error.message
        });
    }
};

// Cancel a booking
export const cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findById(id);

        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }
        if (req.userId && booking.user && booking.user.toString() !== req.userId) {
             return res.status(403).json({ success: false, message: "Not authorized to cancel this booking" });
        }
        booking.status = 'cancelled';
        await booking.save();

        res.status(200).json({
            success: true,
            message: "Booking cancelled successfully",
            booking
        });
    } catch (error) {
        console.error("Error cancelling booking:", error);
        res.status(500).json({
            success: false,
            message: "Failed to cancel booking",
            error: error.message
        });
    }
};

// Update booking status
export const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; 

        const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status" });
        }

        const booking = await Booking.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({ success: false, message: "Booking not found" });
        }

        res.status(200).json({
            success: true,
            message: "Booking status updated",
            booking
        });
    } catch (error) {
        console.error("Error updating booking status:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update booking status",
            error: error.message
        });
    }
};
