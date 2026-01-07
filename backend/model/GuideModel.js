import mongoose from "mongoose";

const GuideSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        photo: {
            type: String,
            default: "",
        },
        experience: {
            type: Number,
            default: 0,
        },
        specialization: {
            type: [String],
            default: [],
        },
        languages: {
            type: [String],
            default: [],
        },
        bio: {
            type: String,
            default: "",
        },
        certifications: {
            type: [String],
            default: [],
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        totalTrips: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },
    },
    { timestamps: true }
);

const Guide = mongoose.model("Guide", GuideSchema);

export default Guide;

