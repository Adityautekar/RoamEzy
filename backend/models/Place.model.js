import {mongoose, Schema} from "mongoose";

const placeSchema = new Schema({
    owner : {
        type: Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    title : {
        type : String,
        required : true,
        trim : true,
    },
    address : {
        type : String,
        required : true,
    },
    distance : {
        type : String,
    },
    price: {
        type : Number,
        required : true,
    },
    photos : {
        type : [String],
        required : true,
    },
    description :{
        type : String,
    },
    category : {
        type : [String],
    },
    features : {
        type : [String],
    },
    extraInfo : {
        type : String,
    },
    checkIn : {
        type : Number,
        required:true,
    },
    checkOut : {
        type : Number,
        required:true,
    },
    maxGuests : {
        type : Number,
        required:true,
    },
    location : {
        type : String,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        validate: {
            validator: function (value) {
                // Check if the rating has only one decimal place
                return (value * 10) % 1 === 0;
            },
            message: props => `${props.value} is not a valid rating. Rating should have only one decimal place.`
        }
    },
    cancellation: {
        type : String,
    },
    houseRules : {
        type : [String]
    },
},
    { timestamps:true }
)

export const Place = mongoose.model("Place", placeSchema);
