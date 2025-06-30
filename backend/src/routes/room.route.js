import { Router } from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import { getAllRooms, getSingleRoom, getUserRooms, registerRoom, setRoomAvailability } from "../controllers/room.controller.js";
import upload from "../utils/multer.js";

const roomRouter = Router();

roomRouter.post('/register', verifyJWT, upload.array('images'), registerRoom);
roomRouter.get('/user', verifyJWT, getUserRooms);
roomRouter.put('/availability', verifyJWT, setRoomAvailability);
roomRouter.get('/:id', getSingleRoom);
roomRouter.get('/', getAllRooms);

export default roomRouter;