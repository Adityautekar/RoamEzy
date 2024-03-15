import { asyncHandler } from "../utils/asyncHandlers.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from 'jsonwebtoken';
import { Review } from "../models/Reviews.model.js";
import { User } from "../models/User.model.js";
// import { Place} from "../models/Place.model.js";
import { Booking } from  "../models/Bookings.model.js";
const tokenSecret = process.env.ACCESS_TOKEN_SECRET;

const today = new Date();
const formattedDate =  today.toISOString().split('T')[0];

const postReview = asyncHandler(async (req, res) => {
    const {token} = req.cookies;
    if(!token){
        throw new ApiError(400,"Please Login");
    }
    jwt.verify(token, tokenSecret, {}, async (err, userInfo) => {
        if (err) throw new ApiError(400, err);  
        const {placeid, review, rating} = req.body;
        const userDoc = await User.findById(userInfo.id);
        const newReview = await Review.create({
            user:userInfo.id, place:placeid,
            username:userDoc.username, useravatar:userDoc.avatar , content:review, rating, date:formattedDate
        });
        if(!newReview){
            res.status(500).json("Posting Review Failed...")
        } else {
            res.status(200).json("Review Posted Successfully!")
        }
    })
})

const getReviews = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const bookingDoc = await Booking.findById(id);
    const allReviews = await Review.find({place:bookingDoc.place});
    if(!allReviews){
        res.status(400).json("Reviews for place not found")
    }
    res.status(200).json(allReviews);
    
})

const getAllReviews = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const allreviews = await Review.find({place:id});
    if(allreviews){res.status(200).json(allreviews);}
})


export {
    postReview, getReviews, getAllReviews
}