import User from "../models/user.model.js";
import ApiErrorHandler from "../utils/apiErrorHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import sendMail from "../utils/nodemailer.js";
import axios from "axios";
import PasswordGenerator from "../utils/PasswordGenerator.js";

const registerUser = async (req, res) => {
    try {
        const { fullName, email, phone, password, image, socialAuth } = req.body;

        if(!fullName || !email || !password){
            res.status(400).json(new ApiErrorHandler(false, 'All fields are required.', 400));
            return;
        }

        const userExists = await User.findOne({email});

        if(userExists){
            res.status(400).json(new ApiErrorHandler(false, 'User already exists', 400));
            return;
        }

        const user = await User.create({fullName, email, phone, password, image: image || '', socialAuth:socialAuth || false});

        if(user){
            await loginUser(req, res);
            // res.json({success:true, message:'User created', data:user});
        }else{
            res.json({success:false, message:'Some error occured while creating the user.'});
            return;
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

        const passwordMatched = await bcrypt.compare(password, user.password) || password === user.password;

        if(!passwordMatched && !user.socialAuth){
            res.status(401).json(new ApiErrorHandler(false, 'Wrong password', 401));
            return;
        }

        if(user.socialAuth && !passwordMatched){
            res.status(400).json(new ApiErrorHandler(false, 'You registered with social login', 400));
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
        const image = req.file;

        const image_url = await uploadOnCloudinary(image?.path);

        if(!image_url){
            return res.status(500).json(new ApiErrorHandler(false, 'Image upload failed', 500));
        }

        if(!fullName || !email, !phone, !password){
            return res.status(400).json(new ApiErrorHandler(false, 'All fields are required.', 400));
        }

        user.fullName = fullName;
        user.email = email;
        user.phone = phone;
        user.password = password;
        user.image = image_url.secure_url;

        await user.save({validateBeforeSave:false});

        const accessToken = req?.headers?.authorization.split(' ')[1];

        res.status(200).json({success:true, message:'Profile updated', data:{user, accessToken}});
    }catch(error){
        throw new Error(error);
    }
}

const deleteUserProfile = async (req, res) => {
    try {
        const user = req.user;

        const deletedUser = await User.deleteOne({_id:user._id});

        if(!deletedUser){
            res.status(500).json(new ApiErrorHandler(false, 'User deletion failed', 500));
            return;
        }

        if(user?.image){
            await deleteFromCloudinary(user.image);
        }

        res.status(200).json({success:true, message:'User deleted', status:200, data:deletedUser});
    } catch (error) {
        throw new Error(error);
    }
}

const resetUserPassword = async (req, res) => {
    try {
        const { id } = req.query;

        const { newPassword } = req.body;

        const user = await User.findById(id);

        const isPasswordSame = await bcrypt.compare(newPassword, user.password);

        if(!isPasswordSame){
            res.status(400).json(new ApiErrorHandler(false, 'Password matched old one', 400));
            return;
        }

        user.password = newPassword;
        await user.save({validateBeforeSave:false});

        res.status(200).json({success:true, message:'Password updated', user});
    } catch (error) {
        throw new Error(error);
    }
}

const forgotUserPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if(!email){
            return res.status(400).json(new ApiErrorHandler(false, 'Email not found', 400));
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json(new ApiErrorHandler(false, 'No user found with this email', 404));
        }

        const mailSent = await sendMail(email, 'Password reset request', `<p>Please click on the following link to reset your password: <br /> <a href='${process.env.FRONTEND_URL}/reset-password?id=${user._id}'><strong>Click here to reset</strong></a></p>`);

        if(!mailSent){
            return res.status(500).json(new ApiErrorHandler(false, 'Some error occured while sending the email', 500));
        }

        return res.status(200).json({success:true, message:'Reset link sent on email'});
    } catch (error) {
        throw new Error(error);
    }
}

const getUser = async (req, res) => {
    try {
        const { id } = req.query;

        if(!id){
            return res.status(400).json(new ApiErrorHandler(false, 'Invalid reset link', 400));
        }

        const user = await User.findById(id);

        if(!user){
            return res.status(404).json(new ApiErrorHandler(false, 'No user found', 404));
        }

        res.status(200).json({success:true, message:'User found', user});
    } catch (error) {
        throw new Error(error);
    }
}

const googleRegistration = async (req, res) => {
    try {
        const { google_access_token } = req.body;

        if(!google_access_token){
            res.status(400).json(new ApiErrorHandler(false, 'Google access token not found', 400));
            return;
        }

        const { data } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {headers: {Authorization: `Bearer ${google_access_token}`}});

        if(data){
            const user = await User.findOne({email: data.email});
            
            if(user){
                const req = {
                    body: {email:user.email, password:user.password}
                }
                const login = await loginUser(req, res);
                return;
            }

            const password = PasswordGenerator();
            const req = {
                body: {fullName:data.name, email:data.email, phone: data.phone || '', password, image: data.picture || '', socialAuth:true}
            }
            const register = await registerUser(req, res);
        }
    } catch (error) {
        throw new Error(error);
    }
}

export { registerUser, loginUser, logoutUser, updateUserProfile, deleteUserProfile, resetUserPassword, forgotUserPassword, getUser, googleRegistration, }