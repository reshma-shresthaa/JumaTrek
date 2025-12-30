import Listing from "../model/ListingModel.js";


export const createListing = async (req, res) => {
    try {
         const listingData = req.body;

        
        if (req.files && req.files.length > 0) {
            listingData.gallery = req.files.map(file => file.path);
        }
        const newListing = new Listing(listingData);
        const savedListing = await newListing.save();
        res.status(201).json({
            success: true,
            data: savedListing
        });
    } catch (error) {
        console.error("Error creating listing:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create listing",
            error: error.message
        });
    }
};

// Get all treks (Lite version for cards)
export const getAllListings = async (req, res) => {
    try {
        const listings = await Listing.find({}).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: listings.length,
            data: listings
        });
    } catch (error) {
        console.error("Error fetching listings:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch listings",
            error: error.message
        });
    }
};

// Get single trek by ID (or Title slug in future)
export const getListingById = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return res.status(404).json({
                success: false,
                message: "Trek not found"
            });
        }
        res.status(200).json({
            success: true,
            data: listing
        });
    } catch (error) {
        console.error("Error fetching listing:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch listing",
            error: error.message
        });
    }
};

export const updateListingGallery = async (req, res) => {
    try {
        const listingId = req.params.id;

        const newImages = req.files.map(file => file.path);

        const updatedListing = await Listing.findByIdAndUpdate(
            listingId,
            {
                $push: { gallery: { $each: newImages } }
            },
            { new: true }
        );

        if (!updatedListing) {
            return res.status(404).json({
                success: false,
                message: "Listing not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Gallery updated successfully",
            data: updatedListing
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update gallery",
            error: error.message
        });
    }
};

export const updateListing = async (req, res) => {
    try {
        const listingId = req.params.id;
        const updateData = req.body;

        if (req.files && req.files.length > 0) {
            updateData.gallery = req.files.map(file => file.path);
        }

        const updatedListing = await Listing.findByIdAndUpdate(
            listingId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedListing) {
            return res.status(404).json({
                success: false,
                message: "Listing not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Listing updated successfully",
            data: updatedListing
        });
    } catch (error) {
        console.error("Error updating listing:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update listing",
            error: error.message
        });
    }
};

export const deleteListing = async (req, res) => {
    try {
        const listingId = req.params.id;

        const deletedListing = await Listing.findByIdAndDelete(listingId);

        if (!deletedListing) {
            return res.status(404).json({
                success: false,
                message: "Listing not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Listing deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting listing:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete listing",
            error: error.message
        });
    }
};
