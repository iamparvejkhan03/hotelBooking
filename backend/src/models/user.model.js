import {Schema, model} from "mongoose";

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
        required:true,
        trim:true
    },
    password: {
        type: String,
        required: true,
        trim:true
    }
}, {timestamps:true})

const User = model('User', userSchema);

export default User;