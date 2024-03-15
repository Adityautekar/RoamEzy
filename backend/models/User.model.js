import mongoose, {Schema} from "mongoose";

const userSchema = new Schema(
    {
        username : {
            type : String,
            required : true,
            lowercase : true,
            trim : true,
        },
        email : {
            type : String,
            required : true,
            unique : true,
            trim : true,
        },
        password : {
            type : String,
            required : true,
        },
        fullname : {
            type: String,
        },
        gender : {
            type: String,
            enum : ["Male", "Female", "Other"],
        },
        avatar : {
            type : String,
        },
        phone:{
            type:String,
        },
        nationality : {
            type: String,
        },
        birth : {
            type:Date,
        },
        wishlist : [{
            type : Schema.Types.ObjectId,
            ref : "Place"
        }],
    },
    { timestamps:true }
);

export const User = mongoose.model("User", userSchema);
