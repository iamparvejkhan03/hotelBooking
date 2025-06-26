import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiErrorHandler from "../utils/apiErrorHandler.js";

const verifyJWT = async (req, res, next) => {
    try {
        const accessToken = req?.headers?.authorization.split(' ')[1];
        
        const {_id} = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);

        const user = await User.findById(_id, "-password -refreshToken");

        if(!user){
            res.status(404).json(new ApiErrorHandler(false, 'No user found.', 404));
        }

        req.user = user;
        next();
    } catch (error) {
        throw new Error(error); 
    }
}

export default verifyJWT;