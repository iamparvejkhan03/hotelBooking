import { Router } from "express";
import { deleteUserProfile, forgotUserPassword, getUser, loginUser, logoutUser, registerUser, resetUserPassword, updateUserProfile } from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/verifyJWT.js";
import upload from "../utils/multer.js";

const userRouter = Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout', verifyJWT, logoutUser);
userRouter.put('/update', verifyJWT, upload.single('image'), updateUserProfile);
userRouter.delete('/delete', verifyJWT, deleteUserProfile);
userRouter.put('/reset-password', resetUserPassword);
userRouter.post('/forgot-password', forgotUserPassword);
userRouter.get('/', getUser);

export default userRouter;