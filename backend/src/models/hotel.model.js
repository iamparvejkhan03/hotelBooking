import { model, Schema } from "mongoose"

const hotelSchema = new Schema({
    name: {
        type: String,
        index:true,
        trim:true,
        required:true
    },
    phone: {
        type: String,
        trim:true,
        required:true
    },
    address: {
        type: String,
        trim:true,
        required:true
    },
    city: {
        type: String,
        trim:true,
        required:true
    },
    owner: {
        type: Schema.Types.ObjectId,
        required:true
    }
}, {timestamps:true});

const Hotel = model('Hotel', hotelSchema);

export default Hotel;