import express from "express";
import { createCustomTrip, getMyCustomTrips, getTrekInfoByDestination } from "../controllers/CustomTripController.js";
import isAuth from "../middleware/isAuth.js";

const customTripRouter = express.Router();

customTripRouter.post("/", isAuth, createCustomTrip);
customTripRouter.get("/my", isAuth, getMyCustomTrips);
customTripRouter.get("/trek-info/:destination", getTrekInfoByDestination);

export default customTripRouter;
