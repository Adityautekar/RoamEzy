import { asyncHandler } from "../utils/asyncHandlers.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import jwt from 'jsonwebtoken';
import { Place } from "../models/Place.model.js";
import { User } from "../models/User.model.js";
const tokenSecret = process.env.ACCESS_TOKEN_SECRET;

const addPlace = asyncHandler(async (req, res) => {
    const {token} = req.cookies;
    const {title, address, addedPhotos,
        description, features, checkIn,price,
         checkOut, maxGuests,location, cancellation, selectedCategories, extraInfo} = req.body;
    if (
        [title, address, price?.toString()].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    jwt.verify(token, tokenSecret, {}, async (err, userInfo) => {
        if(err) throw err;
        const newPlace = await Place.create({
            owner : userInfo.id,
            title, address, photos:addedPhotos,
            description, features, checkIn,price,
            checkOut, maxGuests, category:selectedCategories, location, extraInfo, cancellation
        });
        res.json(newPlace)
        
    })
});


const deletePlace = asyncHandler(async (req, res) => {
    const {id} = req.body;
    const {token} = req.cookies;
    jwt.verify(token, tokenSecret, {}, async (err, userInfo) => {
        if(err) throw err;
        try {
            const curr_place = await Place.findById(id);
            if(!curr_place){
                return res.status(402).json({ message: "Place not found" });
            }
            if(userInfo.id === curr_place.owner.toString()){
                await Place.deleteOne({_id:id});
                return res.status(200).json({message: "Place deleted!"})
            } else {
                return res.status(403).json({ message: "Unauthorized to delete this Place" });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({message:"Server Failed to delete..."})
        }
    })
})


const uploadPhoto = asyncHandler(async (req, res) => {
    const localPath = req.files?.photos[0]?.path;
    if(!localPath) throw new ApiError(400,"File not found...");
    const cloudphoto = await uploadOnCloudinary(localPath)
    if(!cloudphoto) throw new ApiError(401, "Cloudinary Upload Failed...")
    res.json(cloudphoto.url);
})

const deletePhoto = asyncHandler(async (req, res) => {
    const {photoid, placeid} = req.body;
    const {token} = req.cookies;
    const Placeinfo = await Place.findById(placeid);
    if(!Placeinfo){
        res.status(401).json({message :"Place not found..."})
    }
    try {
        jwt.verify(token, tokenSecret, {}, async(err, userInfo) => {
            if(err) throw err;
            const {id} = userInfo;
            if(id === Placeinfo.owner.toString()){
                Placeinfo.photos = Placeinfo.photos.filter(photo => photo.toString() !== photoid);
                await Placeinfo.save();
                res.status(200).json({message:"Photo Deleted Successfully!"})
            } else{
                res.status(500).json({message:"User unauthorized to delete..."})
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json("Server Issue to delete");
    }
});

const getAllPlaces = asyncHandler(async(_, res) => {
    res.json( await Place.find());
})

const userPlaces = asyncHandler(async (req, res) => {
    const {token} = req.cookies;
    if (!token) {
        return res.status(401).json({ message: 'JWT token is missing' });
    }
    jwt.verify(token, tokenSecret, {}, async (err, userInfo) => {
        if (err) {
            // If there's an error with the JWT, return an error response
            return res.status(401).json({ message: 'Invalid JWT token' });
        }
        // Extract user ID from the JWT payload
        const { id } = userInfo;

        try {
            // Query the database for places owned by the user
            const userOwnedPlaces = await Place.find({ owner: id });

            // Return the user's places as JSON response
            res.json(userOwnedPlaces);
        } catch (error) {
            // Handle any errors that occur during database query
            console.error('Error retrieving user places:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });
});

const getSinglePlace = asyncHandler( async (req, res) => {
    const {id} = req.params;
    try {
        const place = await Place.findById(id);
        if (place){
            const ownerid = place.owner;
            const owner = await User.findById(ownerid);
            res.status(200).json({place, owner});
        }
    } catch (error) {
        res.status(500).json("Data not found");
    }
    // res.json(await Place.findById(id));
});


const queryPlaces = asyncHandler(async (req, res) => {
    const { s_place, keyword } = req.body;
    // console.log(s_place, keyword);
    let query = {};
  
    // Add search criteria based on s_place and keyword
    if (s_place) {
      query.address = { $regex: new RegExp(s_place, 'i') };
    }
    if (keyword) {
      query.title = { $regex: new RegExp(keyword, 'i') };
    }
  
    try {
      const places = await Place.find(query);
      res.json(places);
    } catch (error) {
      console.error('Error querying places:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});
const updatePlace = asyncHandler(async (req, res) => {
    const {token} = req.cookies;
    const {
        id, title, address, description, checkIn,
        checkOut, maxGuests, features, price, addedPhotos, location, selectedCategories, extraInfo, cancellation
    } = req.body;
    
    jwt.verify(token, tokenSecret, {}, async (err, userInfo) => {
        if (err) throw err;
        const PlaceDoc = await Place.findById(id);  
        if(userInfo.id === PlaceDoc.owner.toString()) {
            PlaceDoc.set({title, address, description,photos:addedPhotos, checkIn, 
                price, checkOut, maxGuests, features, location, category:selectedCategories,
                 extraInfo, cancellation});
            await PlaceDoc.save();
            res.json("Place details updated!");
        }
    });
});



export {
    addPlace, getAllPlaces, updatePlace, getSinglePlace,
     userPlaces, uploadPhoto, deletePlace, deletePhoto,
     queryPlaces
    
}