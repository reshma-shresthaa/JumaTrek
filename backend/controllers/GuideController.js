import Guide from "../model/GuideModel.js";

export const getAllGuides = async (req, res) => {
    try {
        const { status, search } = req.query;
        const filter = {};

        if (status && status !== "all") {
            filter.status = status;
        }

        if (search && search.trim() !== "") {
            const regex = new RegExp(search.trim(), "i");
            filter.$or = [
                { name: regex },
                { specialization: regex },
                { languages: regex },
            ];
        }

        const guides = await Guide.find(filter).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: guides.length,
            data: guides,
        });
    } catch (error) {
        console.error("Error fetching guides:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch guides",
            error: error.message,
        });
    }
};

export const getGuideById = async (req, res) => {
    try {
        const { id } = req.params;
        const guide = await Guide.findById(id);

        if (!guide) {
            return res.status(404).json({
                success: false,
                message: "Guide not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: guide,
        });
    } catch (error) {
        console.error("Error fetching guide:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch guide",
            error: error.message,
        });
    }
};

export const createGuide = async (req, res) => {
    try {
        const payload = { ...req.body };

        if (req.file && req.file.path) {
            payload.photo = req.file.path;
        }

        // Normalize listing reference if sent as string
        if (payload.listing === "" || payload.listing === "null") {
            payload.listing = null;
        }

        if (typeof payload.specialization === "string") {
            payload.specialization = [payload.specialization];
        }
        if (typeof payload.languages === "string") {
            payload.languages = [payload.languages];
        }
        if (typeof payload.certifications === "string") {
            payload.certifications = [payload.certifications];
        }

        const guide = await Guide.create(payload);

        return res.status(201).json({
            success: true,
            data: guide,
        });
    } catch (error) {
        console.error("Error creating guide:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to create guide",
            error: error.message,
        });
    }
};

export const updateGuide = async (req, res) => {
    try {
        const { id } = req.params;
        const payload = { ...req.body };

        if (req.file && req.file.path) {
            payload.photo = req.file.path;
        }

        if (payload.listing === "" || payload.listing === "null") {
            payload.listing = null;
        }

        if (typeof payload.specialization === "string") {
            payload.specialization = [payload.specialization];
        }
        if (typeof payload.languages === "string") {
            payload.languages = [payload.languages];
        }
        if (typeof payload.certifications === "string") {
            payload.certifications = [payload.certifications];
        }

        const guide = await Guide.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
        });

        if (!guide) {
            return res.status(404).json({
                success: false,
                message: "Guide not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: guide,
        });
    } catch (error) {
        console.error("Error updating guide:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update guide",
            error: error.message,
        });
    }
};

export const deleteGuide = async (req, res) => {
    try {
        const { id } = req.params;

        const guide = await Guide.findByIdAndDelete(id);

        if (!guide) {
            return res.status(404).json({
                success: false,
                message: "Guide not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Guide deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting guide:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete guide",
            error: error.message,
        });
    }
};