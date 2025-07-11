import { Schema, model } from "mongoose";

const bookingSchema = new Schema({
    room: {
        type: Schema.Types.ObjectId,
        ref:'Room'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    guests: {
        type: Number,
        required:true,
        trim:true
    },
    checkIn: {
        type: Date,
        required:true,
        trim:true
    },
    checkOut: {
        type: Date,
        required:true,
        trim:true
    },
    isPaid: {
        type: Boolean,
        required:true,
        default:true
    },
    paymentMethod: {
        type: String,
        required:true,
        default:'Stripe'
    },
    amount: {
        type: Number,
        required:true,
        trim:true,
    }
}, {timestamps:true})

const Booking = model('Booking', bookingSchema);

export default Booking;