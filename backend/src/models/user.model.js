import {Schema, model} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    fullName: {
        type: String,
        required:true,
        trim:true
    },
    email: {
        type: String,
        required:true,
        trim:true,
        unique:true,
        index:true,
    },
    phone: {
        type: String,
        trim:true
    },
    password: {
        type: String,
        trim:true
    },
    image: {
        type: String,
        required:false,
        trim:true
    },
    refreshToken: {
        type: String,
        trim:true
    },
    socialAuth: {
        type: Boolean,
    }
}, {timestamps:true})

userSchema.methods.generateAccessToken = async function() {
    try {
        return await jwt.sign(
            {_id:this._id}, 
            process.env.ACCESS_TOKEN_SECRET_KEY, 
            {expiresIn:process.env.ACCESS_TOKEN_EXPIRY})
    } catch (error) {
        console.error(error.message);
    }
}

userSchema.methods.generateRefreshToken = async function() {
    try {
        return await jwt.sign(
            {_id:this._id}, 
            process.env.REFRESH_TOKEN_SECRET_KEY, 
            {expiresIn:process.env.REFRESH_TOKEN_EXPIRY})
    } catch (error) {
        console.error(error.message);
    }
}

userSchema.pre('save', async function(next) {
    try {
        if(this.isModified('password')){
            this.password = await bcrypt.hash(this.password, 10);
            next();
        }
        return;
    } catch (error) {
        throw new Error(error.message);
    }
})

const User = model('User', userSchema);

export default User;