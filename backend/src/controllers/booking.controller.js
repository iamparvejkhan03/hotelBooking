import Booking from "../models/booking.model.js";
import Hotel from "../models/hotel.model.js";
import Room from "../models/room.model.js";
import ApiErrorHandler from "../utils/apiErrorHandler.js";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

const addBooking = async (req, res) => {
    try {
        const { guests, checkIn, checkOut, room, amount } = req.body;

        const user = req.user._id;

        if (!guests || !checkIn || !checkOut || !room || !amount) {
            return res.status(400).json(new ApiErrorHandler(false, 'All fields are required.', 400));
        }

        const booking = await Booking.create({ guests, checkIn, checkOut, user, room, amount });

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

        const ownerBookings = await Booking.aggregate([
            {
                $lookup: {
                    from:'rooms',
                    localField:'room',
                    foreignField:'_id',
                    as:'room',
                }
            },
            {
                $unwind:'$room'
            },
            {
                $lookup: {
                    from:'hotels',
                    localField:'room.hotel',
                    foreignField:'_id',
                    as:'hotel'
                }
            },
            {
                $unwind:'$hotel'
            },
            {
                $lookup: {
                    from:'users',
                    localField:'user',
                    foreignField:'_id',
                    as:'userData'
                }
            },
            {
                $unwind:'$userData',
            },
            {
                $match: {
                    'hotel.owner': user,
                }
            },
            {
                $addFields: {
                    room:'$room',
                    hotel:'$hotel',
                    userData: '$userData'
                },
            },
            {
                $project: {
                    room:1, hotel:1, amount:1, guests:1, checkIn:1, checkOut:1, userData:1, isPaid:1, paymentMethod:1
                }
            }
        ])

        if(!ownerBookings){
            return res.status(404).json(new ApiErrorHandler(false, 'No bookings found', 404));
        }

        return res.status(200).json({success:true, message:'Bookings found', ownerBookings});
    } catch (error) {
        throw new Error(error);
    }
}

export  { addBooking, getUserBookings, getOwnerBookings, }