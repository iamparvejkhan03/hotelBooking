import { Router } from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import { registerRoom } from "../controllers/room.controller.js";
import upload from "../utils/multer.js";

const roomRouter = Router();

roomRouter.post('/register', verifyJWT, upload.array('images'), registerRoom);

export default roomRouter;