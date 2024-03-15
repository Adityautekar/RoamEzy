import {mongoose, Schema} from "mongoose";

const bookingSchema = new Schema({
    place : {
        type: Schema.Types.ObjectId,
        ref : "Place",
        required : true,
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    checkIn : {
        type : String,
        required : true,
    },
    checkOut : {
        type : String,
        required : true,
    },
    noOfGuests : {
        type : Number,
        required : true,
    },
    price : {
        type : Number,
    },
    noOfNights : {
        type : Number
    }
}, { timestamps:true })

export const Booking = mongoose.model("Booking", bookingSchema);