export const validateListingFilters = (req, res, next) => {
    try {
        const { minPrice, maxPrice, duration, page, limit, region, difficulty } = req.query;

         if (minPrice && isNaN(parseFloat(minPrice))) {
            return res.status(400).json({
                success: false,
                message: "minPrice must be a valid number"
            });
        }

        if (maxPrice && isNaN(parseFloat(maxPrice))) {
            return res.status(400).json({
                success: false,
                message: "maxPrice must be a valid number"
            });
        }

        if (duration && isNaN(parseInt(duration))) {
            return res.status(400).json({
                success: false,
                message: "duration must be a valid number"
            });
        }

        if (page && (isNaN(parseInt(page)) || parseInt(page) < 1)) {
            return res.status(400).json({
                success: false,
                message: "page must be a positive integer"
            });
        }

        if (limit && (isNaN(parseInt(limit)) || parseInt(limit) < 1)) {
            return res.status(400).json({
                success: false,
                message: "limit must be a positive integer"
            });
        }

        // Validate price range logic
        if (minPrice && maxPrice && parseFloat(minPrice) > parseFloat(maxPrice)) {
            return res.status(400).json({
                success: false,
                message: "minPrice cannot be greater than maxPrice"
            });
        }

        // Sanitize string inputs (trim whitespace)
        if (region) {
            req.query.region = region.trim();
        }

        if (difficulty) {
            req.query.difficulty = difficulty.trim();
        }

        next();

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Validation error",
            error: error.message
        });
    }
}