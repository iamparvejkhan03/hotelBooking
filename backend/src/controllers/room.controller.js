import Room from "../models/room.model.js";
import Hotel from "../models/hotel.model.js";
import ApiErrorHandler from "../utils/apiErrorHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerRoom = async (req, res) => {
    try {
        const { type, price, amenities } = req.body;

        const images = req.files;

        const user = req.user;

        const hotel = await Hotel.findOne({owner:user._id});

        if(!hotel){
            return res.status(404).json(new ApiErrorHandler(false, 'Could not find the hotel', 404));
        }

        if(!type || !price || !amenities){
            return res.status(400).json(new ApiErrorHandler(false, 'All fields are required', 400));
        }

        if(!images){
            return res.status(500).json(new ApiErrorHandler(false, 'Images not found', 500));
        }

        const uploadPending = images.map(img => uploadOnCloudinary(img?.path));

        const uploadedOnCloudinary = await Promise.all(uploadPending);

        const images_url = uploadedOnCloudinary.map(image => image.secure_url);

        if(!uploadOnCloudinary){
            return res.status(500).json(new ApiErrorHandler(false, 'Could not upload images', 500));
        }

        const room = await Room.create({images:images_url, type, price, amenities, hotel});

        if(!room){
            return res.status(500).json(new ApiErrorHandler(false, 'Could not create room', 500));
        }

        return res.status(200).json({success:true, message:'Room created', room});
    } catch (error) {
        throw new Error(error);
    }
}

export { registerRoom, }