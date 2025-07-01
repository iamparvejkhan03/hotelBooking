import { Router } from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import { deleteRoom, editRoom, getAllRooms, getSingleRoom, getUserRooms, registerRoom, setRoomAvailability } from "../controllers/room.controller.js";
import upload from "../utils/multer.js";

const roomRouter = Router();

roomRouter.post('/register', verifyJWT, upload.array('images'), registerRoom);
roomRouter.get('/user', verifyJWT, getUserRooms);
roomRouter.put('/availability', verifyJWT, setRoomAvailability);
roomRouter.get('/:id', getSingleRoom);
roomRouter.get('/', getAllRooms);
roomRouter.put('/edit/:roomId', verifyJWT, upload.array('images'), editRoom);
roomRouter.delete('/delete/:roomId', verifyJWT, deleteRoom);

export default roomRouter;