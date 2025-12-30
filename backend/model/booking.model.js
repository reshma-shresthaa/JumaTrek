import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    // --- Immediate Fields (Matches Frontend) ---
    trekName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    groupSize: {
        type: Number,
        required: true
    },
    preferredDate: {
        type: Date,
        required: true
    },
    message: {
        type: String
    },
    paymentMethod: {
        type: String,
        enum: ['bank-transfer', 'credit-card', 'paypal', 'cash'],
        default: 'cash'
    },
    // --- Management Fields ---
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },
    totalPrice: {
        type: Number
    },
    // --- Future Proofing (Optional Links) ---
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    trek: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing"
    }
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
