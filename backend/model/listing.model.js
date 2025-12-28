import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    id: {
        type: Number,
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    maxAltitude: {
        type: String 
    },
    bestSeason: {
        type: [String], 
        default: []
    },
    groupSize: {
        type: String 
    },
    highlights: {
        type: [String],
        default: []
    },
    itinerary: [{
        day: { type: Number, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        maxAltitude: { type: String },
        accommodation: { type: String },
        meals: { type: String }
    }],
    includes: {
        type: [String],
        default: []
    },
    excludes: {
        type: [String],
        default: []
    },
    gallery: {
        type: [String], 
        default: []
    }
}, { timestamps: true });

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
