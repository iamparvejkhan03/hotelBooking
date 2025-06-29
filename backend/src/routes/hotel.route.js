import { Router } from "express";
import { deleteHotel, registerHotel, updateHotel } from "../controllers/hotel.controller.js";
import verifyJWT from "../middlewares/verifyJWT.js";

const hotelRouter = Router();

hotelRouter.post('/register', verifyJWT, registerHotel);
hotelRouter.put('/update', verifyJWT, updateHotel);
hotelRouter.delete('/delete', verifyJWT, deleteHotel);

export default hotelRouter;