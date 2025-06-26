import User from "../models/user.model.js";
import ApiErrorHandler from "../utils/apiErrorHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
    try {
        const { fullName, email, phone, password } = req.body;

        if(!fullName || !email || !phone || !password){
            res.status(400).json(new ApiErrorHandler(false, 'All fields are required.', 400));
        }

        const user = await User.create({fullName, email, phone, password});

        if(user){
            await loginUser(req, res);
            // res.json({success:true, message:'User created', data:user});
        }else{
            res.json({success:false, message:'Some error occured while creating the user.'});
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;

        if(!email || !password){
            res.status(400).json(new ApiErrorHandler(false, 'Email and password are required.', 400));
            return;
        }

        const user = await User.findOne({email});

        if(!user){
            res.status(404).json(new ApiErrorHandler(false, 'No user found with this email.', 404));
            return;
        }

        const passwordMatched = await bcrypt.compare(password, user.password);

        if(!passwordMatched){
            res.status(401).json(new ApiErrorHandler(false, 'Wrong password', 401));
            return;
        }

        const { accessToken } = await generateAccessAndRefreshTokens(user);

        res.status(200).cookie('accessToken', accessToken).json({success:true, message:'Logged in', data:{user, accessToken}});

        return user;
    }catch(error){
        throw new Error(error.message);
    }
}

const generateAccessAndRefreshTokens = async (user) => {
    try {
        const refreshToken = await user.generateRefreshToken();
        const accessToken = await user.generateAccessToken();

        user.refreshToken = refreshToken;
        await user.save();

        return {accessToken, refreshToken};
    } catch (error) {
        throw new Error(error.message);
    }
}

const logoutUser = async (req, res) => {
    try {
        const user = req.user;
        user.refreshToken = "";
        await user.save({validateBeforeSave:false});

        res.clearCookie('accessToken').status(200).json({success:true, message:'Logged out'});
    } catch (error) {
        throw new Error(error.message);
    }
}

const updateUserProfile = async (req, res) => {
    try{
        const user = req.user;
        const { fullName, email, phone, password } = req.body;

        if(!fullName || !email, !phone, !password){
            res.status(400).json(new ApiErrorHandler(false, 'All fields are required.', 400));
        }

        user.fullName = fullName;
        user.email = email;
        user.phone = phone;
        user.password = password;

        await user.save({validateBeforeSave:false});

        const accessToken = req?.headers?.authorization.split(' ')[1];

        res.status(200).json({success:true, message:'Profile updated', data:{user, accessToken}});
    }catch(error){
        throw new Error(error);
    }
}

export { registerUser, loginUser, logoutUser, updateUserProfile, }