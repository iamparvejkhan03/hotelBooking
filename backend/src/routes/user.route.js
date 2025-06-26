import { Router } from "express";
import { loginUser, logoutUser, registerUser, updateUserProfile } from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/verifyJWT.js";

const userRouter = Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout', verifyJWT, logoutUser);
userRouter.put('/update', verifyJWT, updateUserProfile);

export default userRouter;