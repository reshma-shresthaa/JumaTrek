import express from 'express';
import { addToWishlist, checkWishlistStatus, getUserWishlist, removeFromWishlist } from '../controllers/wishlist.controller.js';
import isAuth from '../middleware/isAuth.js';


const wishlistRouter = express.Router();

wishlistRouter.post("/add", isAuth , addToWishlist );
wishlistRouter.delete("/remove/:listingId", isAuth, removeFromWishlist );
wishlistRouter.get("/", isAuth, getUserWishlist );
wishlistRouter.get("/check/:listingId", isAuth, checkWishlistStatus);

export default wishlistRouter;


