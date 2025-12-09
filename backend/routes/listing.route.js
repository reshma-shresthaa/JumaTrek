import express from "express";
import { createListing, getAllListings, getListingById, updateListingGallery } from "../controllers/listing.controller.js";
import upload from "../middleware/multer.js";


const listingRouter = express.Router();

listingRouter.post("/", upload.array("images") ,createListing); // Protected route in future
listingRouter.get("/", getAllListings);
listingRouter.get("/:id", getListingById);

listingRouter.put(
    "/update-gallery/:id",
    upload.array("images", 10), 
    updateListingGallery
);

export default listingRouter;
