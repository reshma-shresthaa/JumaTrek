import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    id: {
        type: Number,
        // Optional: integer ID matching frontend 'id' for easier migration, 
        // though standard is _id (ObjectId). 
        // We'll keep it optional or strictly for the 'legacy' id from text file.
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
        type: String // Overall max altitude for the trek header
    },
    bestSeason: {
        type: [String], // Array of strings, e.g. ["Spring", "Autumn"]
        default: []
    },
    groupSize: {
        type: String // e.g., "2-12 people"
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
        type: [String], // Array of image URLs
        default: []
    }
}, { timestamps: true });

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
