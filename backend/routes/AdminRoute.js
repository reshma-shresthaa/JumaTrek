import express from 'express';
import isAdmin from '../middleware/isAdmin.js';
import { deleteUser, getAllBookings, getAllUsers, getDashboardStats, updateBookingStatusAdmin, adminLogin } from '../controllers/AdminController.js';
import { createListing, deleteListing, getAllListings, getListingById, updateListing, updateListingGallery } from '../controllers/ListingController.js';
import upload from '../middleware/multer.js';

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);

adminRouter.get("/dashboard", isAdmin, getDashboardStats);

adminRouter.get("/users", isAdmin, getAllUsers);
adminRouter.delete("/users/:id", isAdmin, deleteUser);

adminRouter.get("/bookings", isAdmin, getAllBookings);
adminRouter.patch("/bookings/:id/status", isAdmin, updateBookingStatusAdmin);

adminRouter.post("listing", isAdmin, upload.array("images"), createListing);
adminRouter.get("/listing", isAdmin, getAllListings);
adminRouter.get("/listing/:id", isAdmin, getListingById);
adminRouter.put("/listing/:id", isAdmin, upload.array("images", 10), updateListing);
adminRouter.put("/listing/:id", isAdmin, upload.array("images", 10), updateListingGallery);
adminRouter.delete("/listing/:id", isAdmin, deleteListing);

export default adminRouter;