import ApiErrorHandler from "../utils/apiErrorHandler.js";
import Hotel from "../models/hotel.model.js";
import User from "../models/user.model.js";

const registerHotel = async (req, res) => {
    try {
        const { name, phone, address, city } = req.body;

        const user = req.user;

        const owner = await User.findById(user._id);

        if(!owner){
            return res.status(404).json(new ApiErrorHandler(false, 'No user found', 404));
        }

        if(!name || !phone || !address || !city){
            return res.status(400).json(new ApiErrorHandler(false, 'All fields are required', 400));
        }

        const hotel = await Hotel.create({name, phone, address, city, owner:owner._id});

        if(!hotel){
            return res.status(500).json(new ApiErrorHandler(false, 'Hotel registration failed', 500));
        }

        owner.isHotelOwner = true;
        await owner.save({validateBeforeSave:false});

        return res.status(200).json({success:true, message:'Hotel registered', hotel, owner});
    } catch (error) {
        throw new Error(error);
    }
}

const updateHotel = async (req, res) => {
    try {
        const { name, phone, address, city } = req.body;
        const user = req.user;

        if(!name || !phone || !address || !city){
            return res.status(400).json(new ApiErrorHandler(false, 'All fields are required', 400));
        }

        const updatedHotel = await Hotel.updateOne({owner:user._id}, {name, phone, address, city});

        if(!updatedHotel){
            return res.status(500).json(new ApiErrorHandler(false, 'Updation failed', 500));
        }

        const hotel = await Hotel.findOne({owner:user._id});

        if(!hotel){
            return res.status(404).json(new ApiErrorHandler(false, 'Hotel not found', 404));
        }

        return res.status(200).json({success:true, message:'Hotel updated', hotel});
    } catch (error) {
        throw new Error(error);
    }
}

const deleteHotel = async (req, res) => {
    try {
        const user = req.user;
        const hotelDeleted = await Hotel.findOneAndDelete({owner:user._id});

        if(!hotelDeleted){
            return res.status(500).json(new ApiErrorHandler(false, 'Hotel deletion failed', 500));
        }

        const owner = await User.findOneAndUpdate({_id:user._id}, {isHotelOwner:false}, {new:true});

        if(!owner){
            return res.status(500).json(new ApiErrorHandler(false, 'Owner updation failed', 500));
        }

        return res.status(200).json({success:true, message: 'Hotel deleted', owner});
    } catch (error) {
        throw new Error(error);
    }
}

export { registerHotel, updateHotel, deleteHotel, }