import { mongoose , Schema} from "mongoose";

const reviewsSchema = new Schema(
    {
        user : {
            type : Schema.Types.ObjectId,
            ref : "User",
            required : true,
        },
        place : {
            type : Schema.Types.ObjectId,
            ref : "Place",
            required : true,
        },
        username : {
            type : String,
        },
        useravatar : {
            type : String,
        },
        content : {
            type : String,
            required : true,
            trim : true,
        },
        rating : {
            type : Number,
            min : 1.0,
            max : 5.0,
            required : true,
        },
        date : {
            type : Date,
        }
    },
    { timestamps:true })

export const Review = mongoose.model("Review", reviewsSchema);