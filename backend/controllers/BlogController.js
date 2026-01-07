import Blog from "../model/BlogModel.js";

const buildSlug = (title) =>
    title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

export const getAllBlogs = async (req, res) => {
    try {
        const { status, category, search } = req.query;
        const filter = {};

        if (status && status !== "all") {
            filter.status = status;
        }
        if (category && category !== "all") {
            filter.category = category;
        }
        if (search && search.trim() !== "") {
            const regex = new RegExp(search.trim(), "i");
            filter.$or = [{ title: regex }, { excerpt: regex }, { tags: regex }];
        }

        const blogs = await Blog.find(filter).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: blogs.length,
            data: blogs,
        });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch blogs",
            error: error.message,
        });
    }
};

export const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }
        return res.status(200).json({
            success: true,
            data: blog,
        });
    } catch (error) {
        console.error("Error fetching blog:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch blog",
            error: error.message,
        });
    }
};

export const createBlog = async (req, res) => {
    try {
        const payload = { ...req.body };

        if (req.file && req.file.path) {
            payload.featuredImage = req.file.path;
        }

        // Ensure slug
        payload.slug =
            payload.slug && payload.slug.trim().length > 0
                ? payload.slug
                : buildSlug(payload.title || "");

        // Ensure tags array
        if (typeof payload.tags === "string") {
            payload.tags = [payload.tags];
        }

        // Published date
        if (payload.status === "published" && !payload.publishedAt) {
            payload.publishedAt = new Date();
        }

        const blog = await Blog.create(payload);

        return res.status(201).json({
            success: true,
            data: blog,
        });
    } catch (error) {
        console.error("Error creating blog:", error);
        if (error.code === 11000 && error.keyPattern?.slug) {
            return res.status(400).json({
                success: false,
                message: "Slug already exists. Please use a different title.",
            });
        }
        return res.status(500).json({
            success: false,
            message: "Failed to create blog",
            error: error.message,
        });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const payload = { ...req.body };

        if (req.file && req.file.path) {
            payload.featuredImage = req.file.path;
        }

        if (!payload.slug && payload.title) {
            payload.slug = buildSlug(payload.title);
        }

        if (typeof payload.tags === "string") {
            payload.tags = [payload.tags];
        }

        // If status transitions from draft to published, set publishedAt
        const existing = await Blog.findById(id);
        if (!existing) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        if (
            payload.status === "published" &&
            existing.status === "draft" &&
            !existing.publishedAt
        ) {
            payload.publishedAt = new Date();
        }

        const blog = await Blog.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
        });

        return res.status(200).json({
            success: true,
            data: blog,
        });
    } catch (error) {
        console.error("Error updating blog:", error);
        if (error.code === 11000 && error.keyPattern?.slug) {
            return res.status(400).json({
                success: false,
                message: "Slug already exists. Please use a different title.",
            });
        }
        return res.status(500).json({
            success: false,
            message: "Failed to update blog",
            error: error.message,
        });
    }
};

export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting blog:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete blog",
            error: error.message,
        });
    }
};

