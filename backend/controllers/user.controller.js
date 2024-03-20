import { asyncHandler } from "../utils/asyncHandlers.js";
import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import jwt from 'jsonwebtoken';
// import mongoose from 'mongoose'
import bcrypt from 'bcryptjs';

import { User } from "../models/User.model.js";
import { Place } from "../models/Place.model.js";
// import { Booking } from "../models/Bookings.model.js";

const salt = bcrypt.genSaltSync(10);
const tokenSecret = process.env.ACCESS_TOKEN_SECRET;
const RegisterUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
        const existedUser = await User.find({email :email, username:username});
        if(existedUser.length>0){
            res.status(401).json("User already Existed!")
        } else {
            const newUser = await User.create({
                username,
                email,
                password : bcrypt.hashSync(password, salt)
            });
            if(newUser){
                res.status(200).json(newUser);
            } else {
                res.status(500).json("Registration failed in database.")
                // new ApiResponse(200, "msad")
            }
        }
});

const addProfile = asyncHandler(async (req, res) => {
    const {id, fullname, phone, nationality, gender, birth, avatar} = req.body;
    const {token} = req.cookies;
    jwt.verify(token, tokenSecret, {}, async (err, userInfo) => {
        if (err) throw err;
        const UserDoc = await User.findById(id);  
        if(userInfo.id === UserDoc.id.toString()) {
            UserDoc.set({avatar, fullname, gender, nationality, phone, birth});
            await UserDoc.save();
            res.json("User details updated!");
        }
    });
    
})

const LoginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const userData = await User.findOne({email});
    if(!userData){
        console.log("User did not exists");
        res.status(401).json("User did not exists");
    }
    else {const isPassValid = bcrypt.compareSync(password, userData.password);
    if(isPassValid){
        jwt.sign({
            email : userData.email,
            id:userData._id,
            }, tokenSecret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token, {
                secure : true,
                sameSite : 'none',
                httpOnly: true,
            }).json(userData);
        });

    } else {
        res.status(401).json("Invalid Password!");
    }}
});

const getProfile = asyncHandler((req, res) => {
    const {token} = req.cookies;
    // if(!token) console.log("Token not found");
    if(token){
        jwt.verify(token, tokenSecret, {}, async (err, userInfo) => {
            if(err) throw err;
            const userDoc = await User.findById(userInfo.id).select('-password');
            res.json(userDoc);
        })
    } else {

        res.json(null);
    }
});

const uploadAvatar = asyncHandler(async (req, res) => {
    const localPath = req.files?.avatar[0]?.path;
    console.log(localPath)
    if(!localPath) throw new ApiError(400,"File not found...");
    const cloudphoto = await uploadOnCloudinary(localPath)
    if(!cloudphoto) throw new ApiError(401, "Cloudinary Upload Failed...")
    console.log(cloudphoto.url)
    res.json(cloudphoto.url)
})

const wishlistPlace = asyncHandler(async (req, res) => {
    const {token} = req.cookies;
    const {wishlist} = req.body;

    try {
        jwt.verify(token, tokenSecret, {}, async(err, userInfo) => {
            if(err) throw err;
            const {id} = userInfo;
            const userDoc = await User.findById(id);
            userDoc.wishlist = wishlist;
            const added = await userDoc.save();
            if(added) res.status(200).json({message:"Item Wishlisted"})
            else res.status(500).json({message:"Failed wishlisting"})
        })
    } catch (error) {
        res.status(500).json("Internal Error");
    }
})

const getWishlist = asyncHandler(async(req, res) => {
    const { token } = req.cookies;
    const userInfo = jwt.verify(token, tokenSecret);
    const { id } = userInfo;
    
    const userDoc = await User.findById(id);
    if (!userDoc) {
        res.status(401).json({ message: "User not found..." });
    } else {
        try {
            const wishlist = userDoc.wishlist;
            const placeIds = wishlist.map(wish => wish.toString());
            const places = await Promise.all(placeIds.map(async placeId => {
                const place = await Place.findById(placeId);
                return place;
            }));
            res.status(200).json(places);
        } catch (error) {
            console.error('Error fetching wishlist:', error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
});

const getOwner = asyncHandler(async (req, res) => {
    const {ownerid} = req.params;
    if(ownerid){
        res.status(200).json(await User.findById(ownerid));
    }else{
        res.status(500).json({message:"Owner not Found"})
    }
})

const updatePassword = asyncHandler(async (req, res) => {
    const {id, newpass} = req.body;
    const {token} = req.cookies;
    jwt.verify(token, tokenSecret, {}, async (err, userInfo) => {
        if(userInfo.id===id){
            const userDoc = await User.findById(id);
            if(!userDoc){
                res.status(500).json({message:"Usernot found.."})
            } else {
                userDoc.password = bcrypt.hashSync(newpass, salt);
                const added = await userDoc.save(); 
                if(added)
                    {res.status(200).json("Password Updated Successfully!")
                } else {
                    res.status(501).json({message:"Saving failed...."})
                }
            }
        } else {
            res.status(402).json({message:"Invalid user"})
        }
    })
})


const updateCredentails = asyncHandler(async (req, res) => {
    const {id, newemail, newUsername} = req.body;
    const {token} = req.cookies;
    jwt.verify(token, tokenSecret, {}, async (err, userInfo) => {
        if(userInfo.id===id){
            const userDoc = await User.findById(id);
            if(!userDoc){
                res.status(500).json({message:"Usernot found.."})
            } else {
                if(newemail !== ''){
                    userDoc.email = newemail;
                }
                if(newUsername !== ''){
                    userDoc.username = newUsername;
                }
                const added = await userDoc.save(); 
                if(added)
                    {res.status(200).json("Password Updated Successfully!")
                } else {
                    res.status(501).json({message:"Saving failed...."})
                }
            }
        } else {
            res.status(402).json({message:"Invalid user"})
        }
    })
})

const logoutUser = asyncHandler( (req, res) => {
    res.cookie('token', '',{
        expires: new Date(0),
        httpOnly: true,
        secure: true, 
        sameSite: 'none', 
    }).json(true);
});

export {
    RegisterUser, 
    LoginUser,
    getProfile, 
    logoutUser,
    addProfile,
    uploadAvatar,
    wishlistPlace,
    getWishlist,
    getOwner,
    updatePassword,
    updateCredentails,
}

