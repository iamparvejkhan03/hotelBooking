import { Router } from "express";
import { addBooking, getOwnerBookings, getUserBookings } from "../controllers/booking.controller.js";
import verifyJWT from "../middlewares/verifyJWT.js";

const bookingRouter = Router();

bookingRouter.post('/add', verifyJWT, addBooking);
bookingRouter.get('/user', verifyJWT, getUserBookings);
bookingRouter.get('/owner', verifyJWT, getOwnerBookings);

export default bookingRouter;