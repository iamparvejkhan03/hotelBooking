import { Schema, model } from "mongoose";

const roomSchema = new Schema({
    images: {
        type: [
            {
                type: String,
            }
        ],
        required:true
    },
    type: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required:true
    },
    amenities: {
        type: [
            {
                type: String,
            }
        ],
        required:true
    },
    isAvailable: {
        type: Boolean,
        default:true
    },
    hotel: {
        type: Schema.Types.ObjectId,
        required:true,
        ref: 'Hotel'
    }
}, {timestamps:true});

const Room = model('Room', roomSchema);

export default Room;