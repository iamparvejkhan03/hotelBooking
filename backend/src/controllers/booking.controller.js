import Booking from "../models/booking.model.js";
import Hotel from "../models/hotel.model.js";
import Room from "../models/room.model.js";
import ApiErrorHandler from "../utils/apiErrorHandler.js";

const addBooking = async (req, res) => {
    try {
        const { guests, checkIn, checkOut, room } = req.body;

        const user = req.user._id;

        if (!guests || !checkIn || !checkOut || !room) {
            return res.status(400).json(new ApiErrorHandler(false, 'All fields are required.', 400));
        }

        const booking = await Booking.create({ guests, checkIn, checkOut, user, room });

        if (!booking) {
            return res.status(500).json(new ApiErrorHandler(false, 'Booking failed', 500));
        }

        return res.status(200).json({success:true, message:'Room booked', booking});
    } catch (error) {
        throw new Error(error);
    }
}

const getUserBookings = async (req, res) => {
    try {
        const user = req.user._id;

        const userBookings = await Booking.find({user}).populate({
            path:'room',
            populate: {
                path:'hotel'
            }
        });

        if(!userBookings){
            return res.status(404).json(new ApiErrorHandler(false, 'No bookings found', 404));
        }

        return res.status(200).json({success:true, message:'Bookings found', userBookings});
    } catch (error) {
        throw new Error(error);
    }
}

const getOwnerBookings = async (req, res) => {
    try {
        const user = req.user._id;

        const hotel = await Hotel.findOne({owner:user});

        if(!hotel){
            res.status(404).json(new ApiErrorHandler(false, 'No hotel found', 404));
        }

        const rooms = await Room.find({hotel:hotel._id});

        // console.log(rooms);

        if(!rooms){
            res.status(404).json(new ApiErrorHandler(false, 'No rooms found', 404));
        }

        let ownerBookings = [];

        rooms.forEach(async (room) => {
            const booking = await Booking.findOne({room:room._id});
            if(booking){
                ownerBookings.push(booking);
                console.log(`I am inside ${ownerBookings}`);
                
            }
        });

        console.log(`I am outside ${ownerBookings}`);

        if(!ownerBookings){
            return res.status(404).json(new ApiErrorHandler(false, 'No bookings found', 404));
        }

        return res.status(200).json({success:true, message:'Bookings found', ownerBookings});
    } catch (error) {
        throw new Error(error);
    }
}

export  { addBooking, getUserBookings, getOwnerBookings, }