import { model, Schema } from "mongoose";

const newsletterSchema = new Schema({
    email: {
        type: String,
        required:true,
        lowercase:true,
        trim:true,
        index:true
    },
    isSubscribed: {
        type: Boolean,
        required:true,
        default:true
    }
}, {timestamps:true});

const Newsletter = model('Newsletter', newsletterSchema);

export default Newsletter;