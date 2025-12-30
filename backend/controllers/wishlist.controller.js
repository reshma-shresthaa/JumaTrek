import Wishlist from "../model/wishlist.model.js";
import Listing from "../model/listing.model.js";

export const addToWishlist = async (req, res) => {
    try {
        const { listingId } = req.body; 
        const userId = req.userId;

        const listing = await Listing.findById(listingId);
        if (!listing) {
            return res.status(404).json({sucess: false, message: 'Listing not found' });
        }

        const existingWishlistItem = await Wishlist.findOne({ user: userId, 
            listing: listingId 
        });

        if (existingWishlistItem) {
            return res.status(400).json({ success: false, message: 'Package is already added in wishlist' });
        }

        const newWishlistItem = new Wishlist({
            user: userId,
            listing: listingId
        });

        const savedItem = await newWishlistItem.save();

        res.status(201).json({ 
            success: true, 
            message: "Package added to wishlist", wishlistItem: savedItem });

    } catch (error) {
        console.error("Error adding to wishlist:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to add to wishlist", 
            error: error.message });
    }

};

export const removeFromWishlist = async (req, res) => {
    try{
        const { listingId } = req.params;
        const userId = req.userId;

        const deletedItem = await Wishlist.findOneAndDelete({ user: userId, 
            listing: listingId });

        if (!deletedItem) {
            return res.status(404).json({ success: false, message: "Item not found in wishlist" });
        }
        res.status(200).json({ success: true, message: "Item removed from wishlist" });
    } catch (error) {
        console.error("Error checking from wishlist:", error);
        res.status(500).json({
            success: false,
            message: "Failed to remove from wishlist",
            error: error.message
        });
    }
};

export const getUserWishlist = async (req, res) => {
    try {
        const userId = req.userId;

        const wishlistItems = await Wishlist.find({ user: userId })
            .populate('listing')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            wishlist: wishlistItems
        });
    } catch (error) {
        console.error("Error fetching wishlist:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch wishlist",
            error: error.message
        });
    }
};

export const checkWishlistStatus = async (req, res) => {
    try {
        const { listingId } = req.params;
        const userId = req.userId;

        const wishlistItem = await Wishlist.findOne({
            user: userId,
            listing: listingId
        });

        res.status(200).json({
            success: true,
            isInWishlist: !!wishlistItem
        });
    } catch (error) {
        console.error("Error checking wishlist status:", error);
        res.status(500).json({
            success: false,
            message: "Failed to check wishlist status",
            error: error.message
        });
    }
};