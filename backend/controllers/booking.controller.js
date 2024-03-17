import { Booking } from "../models/Bookings.model.js";
import { Place } from "../models/Place.model.js";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandlers.js";
import jwt from 'jsonwebtoken';

const tokenSecret = process.env.ACCESS_TOKEN_SECRET;

const addBooking = asyncHandler(async (req, res) => {
    const {token} = req.cookies;
    if(!token){
        throw new ApiError(400,"Please Login");
    }
    try {
        jwt.verify(token, tokenSecret, {}, async (err, userInfo) => {
            if (err) {
                // Handle JWT verification error
                throw new ApiError(401, "Invalid token");
            }
            const {place, checkIn, checkOut, noOfGuests,price, noOfNights} = req.body; 
            const existingBookings = await Booking.find({place});
            const conflict = existingBookings.some(booking => {
                // Check if requested check-in date is between existing booking's check-in and check-out dates
                // or if requested check-out date is between existing booking's check-in and check-out dates
                // or if existing booking's check-in date is between requested check-in and check-out dates
                // or if existing booking's check-out date is between requested check-in and check-out dates
                return (checkIn >= booking.checkIn && checkIn < booking.checkOut) ||
                       (checkOut > booking.checkIn && checkOut <= booking.checkOut) ||
                       (booking.checkIn >= checkIn && booking.checkIn < checkOut) ||
                       (booking.checkOut > checkIn && booking.checkOut <= checkOut);
            });
            if(conflict){
                res.status(205).json("Booking not available");
            }
            else {
                const booking = await Booking.create({
                    place,user:userInfo.id, checkIn, checkOut, noOfGuests, noOfNights, price
                })
                if(booking){
                    res.status(200).json(booking);
                }
            }
        }) 
    } catch (error) {
        res.status(500).json(error.message);
    }   
});


const getBookings = asyncHandler(async (req, res) => {
    const {token} = req.cookies;
    try {
        jwt.verify(token, tokenSecret, {}, async (err, userInfo) => {
            if(err) throw err;
            const {id} = userInfo;
            const s_booking = await Booking.find({user:id}).populate('place').populate('user');

            res.json(s_booking);
        })
    } catch (error) {
        res.status(500).json("Booking not found...")
    }
});

// const getonebooking = asyncHandler(async (req, res) => {
//     const {token} = req.cookies;
//     const {id} = req.params();
//     try {
//         jwt.verify(token, tokenSecret, {}, async (err, userInfo) => {
//             const bookedplace = await Booking.findById(id);
//             if(bookedplace.user === userInfo.id){
//                 const place = await Place.findById(bookedplace.place);
//                 const owner = await User.findById(place.owner);
//                 res.status(200).json({bookedplace, owner});
//             }
//         })
//     } catch (error) {
//         res.status(500).json("Internal server error");
//     }
// })
const deleteBooking = asyncHandler(async (req, res) => {
    const { token } = req.cookies;
    const { id } = req.body;
    jwt.verify(token, tokenSecret, {}, async (err, userInfo) => {
        if (err) throw err;
        try {
            const booking = await Booking.findById(id);
            if (!booking) {
                return res.status(404).json({ message: "Booking not found" });
            }
            if (userInfo.id === booking.user.toString()) {
                await Booking.deleteOne({ _id: id }); 
                return res.status(200).json({ message: "Booking deleted successfully" });
            } else {
                return res.status(403).json({ message: "Unauthorized to delete this booking" });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server error" });
        }
    });
});

export {
    addBooking, getBookings,deleteBooking
}