import express from 'express';
import isAdmin from '../middleware/isAdmin.js';
import { deleteUser, getAllBookings, getAllUsers, getDashboardStats, updateBookingStatusAdmin, adminLogin } from '../controllers/AdminController.js';
import { createListing, deleteListing, getAllListings, getListingById, updateListing, updateListingGallery } from '../controllers/ListingController.js';
import { getAllGuides, createGuide, updateGuide, deleteGuide } from '../controllers/GuideController.js';
import { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog } from '../controllers/BlogController.js';
import upload from '../middleware/multer.js';
import { validateListingFilters } from '../middleware/validation.js';
import { getAllCustomTripsAdmin, getCustomTripByIdAdmin, updateCustomTripStatusAdmin } from '../controllers/CustomTripController.js';

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);

adminRouter.get("/dashboard", isAdmin, getDashboardStats);

adminRouter.get("/users", isAdmin, getAllUsers);
adminRouter.delete("/users/:id", isAdmin, deleteUser);

adminRouter.get("/bookings", isAdmin, getAllBookings);
adminRouter.patch("/bookings/:id/status", isAdmin, updateBookingStatusAdmin);

// Custom trip requests
adminRouter.get("/custom-trips", isAdmin, getAllCustomTripsAdmin);
adminRouter.get("/custom-trips/:id", isAdmin, getCustomTripByIdAdmin);
adminRouter.patch("/custom-trips/:id/status", isAdmin, updateCustomTripStatusAdmin);

adminRouter.post("/listing", isAdmin, upload.array("images",10), createListing);
adminRouter.get("/listing", isAdmin, validateListingFilters, getAllListings);
// adminRouter.get("/listing", isAdmin, getAllListings);
adminRouter.get("/listing/:id", isAdmin, getListingById);
adminRouter.put("/listing/:id", isAdmin, upload.array("images",10),  updateListing);
adminRouter.delete("/listing/:id", isAdmin, deleteListing);

// Guides management
adminRouter.get("/guides", isAdmin, getAllGuides);
adminRouter.post("/guides", isAdmin, upload.single("photo"), createGuide);
adminRouter.put("/guides/:id", isAdmin, upload.single("photo"), updateGuide);
adminRouter.delete("/guides/:id", isAdmin, deleteGuide);

// Blogs management
adminRouter.get("/blogs", isAdmin, getAllBlogs);
adminRouter.get("/blogs/:id", isAdmin, getBlogById);
adminRouter.post("/blogs", isAdmin, upload.single("featuredImage"), createBlog);
adminRouter.put("/blogs/:id", isAdmin, upload.single("featuredImage"), updateBlog);
adminRouter.delete("/blogs/:id", isAdmin, deleteBlog);


export default adminRouter;