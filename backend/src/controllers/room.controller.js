import Room from "../models/room.model.js";
import Hotel from "../models/hotel.model.js";
import ApiErrorHandler from "../utils/apiErrorHandler.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

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

const getUserRooms = async (req, res) => {
    try {
        const user = req.user;

        const hotel = await Hotel.findOne({owner:user._id});

        if(!hotel){
            return res.status(404).json(new ApiErrorHandler(false, 'No hotel found', 404));
        }

        const rooms = await Room.find({hotel:hotel._id});

        if(!rooms){
            return res.status(404).json(new ApiErrorHandler(false, 'No rooms found', 404));
        }

        return res.status(200).json({success:true, message:'Rooms fetched', rooms});
    } catch (error) {
        throw new Error(error);
    }
}

const getSingleRoom = async (req, res) => {
    try {
        const { id } = req.params;

        if(!id){
            return res.status(400).json(new ApiErrorHandler(false, 'Room id not found', 400));
        }

        const room = await Room.findById(id).populate({
            path: 'hotel',
            populate: {
                path: 'owner',
                select: '_id email fullName phone image'
            }
        });

        if(!room){
            return res.status(404).json(new ApiErrorHandler(false, 'No room found', 404));
        }

        return res.status(200).json({success:true, message:'Room found', room});
    } catch (error) {
        throw new Error(error);
    }
}

const setRoomAvailability = async (req, res) => {
    try {
        const user = req.user;
        const { isAvailable, id } = req.body;

        const room = await Room.findOneAndUpdate({_id:id}, {isAvailable}, {new:true});

        if(!room){
            return res.status(500).json(new ApiErrorHandler(false, 'Room updation failed', 500));
        }

        return res.status(200).json({success:true, message:'Room availability updated', room});
    } catch (error) {
        throw new Error(error);
    }
}

const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find().populate({
            path: 'hotel'
        }).sort({createdAt: -1});

        if(!rooms){
            return res.status(404).json(new ApiErrorHandler(false, 'No rooms found', 404));
        }

        return res.status(200).json({success:true, message:'Rooms fetched', rooms});
    } catch (error) {
        throw new Error(error);
    }
}

const editRoom = async (req, res) => {
    try {
        const { type, price, amenities } = req.body;

        const images = req.files;

        const user = req.user;

        const { roomId } = req.params;

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

        const roomData = {
            images:images_url,
            type,
            price,
            amenities
        }

        const room = await Room.findOneAndUpdate({_id:roomId}, roomData, {new:true});

        if(!room){
            return res.status(500).json(new ApiErrorHandler(false, 'Could not update room', 500));
        }

        return res.status(200).json({success:true, message:'Room updated', room});
    } catch (error) {
        throw new Error(error);
    }
}

const deleteRoom = async (req, res) => {
    try {
        const user = req.user;

        const { roomId } = req.params;

        if(!roomId){
            return res.status(400).json(new ApiErrorHandler(false, 'Room id not found', 400));
        }

        const room = await Room.findOneAndDelete({_id:roomId}, {new:true});

        if(!room){
            return res.status(500).json(new ApiErrorHandler(false, 'Could not find and delete the room', 500));
        }

        const deletedFromCloudinary = await deleteFromCloudinary(room.images);

        console.log(room);

        if(!deleteFromCloudinary){
            return res.status(500).json(new ApiErrorHandler(false, 'Could not delete images', 500));
        }

        return res.status(200).json({success:true, message:'Room deleted', room});
    } catch (error) {
        throw new Error(error);
    }
}

export { registerRoom, getUserRooms, setRoomAvailability, getSingleRoom, getAllRooms, editRoom, deleteRoom, }