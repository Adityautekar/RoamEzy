import dotenv from "dotenv";
import connectDB from "./db/db.conn.js";
import { app } from "./app.js";
//dotenv
dotenv.config({
    path: './.env'
});
//Database connection establishment
connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`)
    })
})
.catch((err)=> {
    console.log("MONGO DB Connection Failed! Due to Mongo Server Failure...", err)
})
























// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import bcrypt from 'bcryptjs';
// import jwt from "jsonwebtoken";
// import cookieParser from "cookie-parser";
// import { User } from "./models/User.model.js";
// import { Place } from "./models/Place.model.js";
// import imageDownloader from 'image-downloader';
// import multer from "multer";
// import fs from 'fs';
// import { Booking } from "./models/Booings.model.js";
// import connectDB from "./db/db.conn.js";

// const app = express();
// // const salt = bcrypt.genSaltSync(10);
// // const tokenSecret = process.env.ACCESS_TOKEN_SECRET;
// //dotenv
// dotenv.config({
//     path: './.env'
// });
// //use of middlewares
// app.use(express.json());
// app.use(cookieParser());
// app.use('/uploads' , express.static(process.cwd() + '/uploads'));
// app.use(cors({
//     credentials: true,
//     origin: process.env.CORS_ORIGIN,
// }));

// //Database connection establishment
// connectDB()
// .then(() => {
//     app.listen(process.env.PORT || 8000, () => {
//         console.log(`Server is running at port : ${process.env.PORT}`)
//     })
// })
// .catch((err)=> {
//     console.log("MONGO DB Connection Failed! Due to Mongo Server Failure...", err)
// })


// //testing our server
// app.get('/test', (req, res)=>{
//     res.json("Server Running");
// });
// // Register Route
// app.post('/register', async (req, res) => {
//     const {username, email, password} = req.body;
//     try {
//         const newUser = await User.create({
//             username,
//             email,
//             password : bcrypt.hashSync(password, salt)
//         });
//         res.json(newUser);
//         alert("Registration Successfull! LOGIN NOW");
//     } catch (error) {
//         res.status(401).json(error);
//     }
// });

// Login Route
// app.post('/login', async (req, res) => {
//     const {email, password} = req.body;
//     const userData = await User.findOne({email});
//     if(!userData){
//         console.log("User did not exists");
//         res.status(401).json("User did not exists");
//     }
//     const isPassValid = bcrypt.compareSync(password, userData.password);
//     if(isPassValid){
//         jwt.sign({
//             email : userData.email,
//             id:userData._id,
//             }, tokenSecret, {}, (err, token) => {
//             if (err) throw err;
//             res.cookie('token', token).json(userData);
//         });

//     } else {
//         res.status(401).json("Invalid Password!");
//     }
// });

// profile Route
// app.get('/profile', (req, res) => {
//     const {token} = req.cookies;
//     if(!token) console.log("Token not found");
//     if(token){
//         jwt.verify(token, tokenSecret, {}, async (err, userInfo) => {
//             if(err) throw err;
//             const userDoc = await User.findById(userInfo.id).select('-password');
//             res.json(userDoc);
//         })
//     } else {

//         res.json(null);
//     }
// });

//LOGOUT USER
// app.post('/logout', (req, res) => {
//     res.cookie('token', '').json(true);
// });

// app.post('/upload-by-link', async (req, res) => {
//     const {link} = req.body;
//     const newName = 'photo' + Date.now() + '.jpg';
//     await imageDownloader.image({
//         url : link,
//         dest : process.cwd() + '/uploads/' + newName,
//     });
//     res.json(newName);
// })
// const photosMiddleware = multer({dest : 'uploads'});
// app.post('/upload', photosMiddleware.array('photos', 10), (req, res) => {
//     const uploadedFiles = [];
//     for(let i=0;i<req.files.length;i++){
//         const {path, originalname} = req.files[i];
//         const parts = originalname.split('.');
//         const ext = parts[parts.length-1];
//         const newPath = path.replace('uploads/','')+'.'+ext;
//         fs.renameSync(path, newPath);
//         uploadedFiles.push(newPath);
//     }
//     res.json(uploadedFiles);

// });

// app.post('/places', (req, res) => {
//     const {token} = req.cookies;
//     const {title, address, addedPhotos,
//         description, features, checkIn,price,
//          checkOut, maxGuests} = req.body;
//     jwt.verify(token, tokenSecret, {}, async (err, userInfo) => {
//         if(err) throw err;
//         const newPlace = await Place.create({
//             owner : userInfo.id,
//             title, address, photos:addedPhotos,
//             description, features, checkIn,price,
//             checkOut, maxGuests
//         });
//         res.json(newPlace);
//     })
// })

// app.get('/user-places', (req, res) => {
//     const {token} = req.cookies;
//     jwt.verify(token, tokenSecret, {}, async (err, userInfo) => {
//         if (err) throw err;
//         const {id} = userInfo;
//         res.json(await Place.find({owner:id}));
//     })
// })

// app.get('/places/:id', async (req, res) => {
//     const {id} = req.params;
//     res.json(await Place.findById(id));
// })

// app.put('/places', async (req, res) => {
//     const {token} = req.cookies;
//     const {
//         id, title, address, description, checkIn,
//         checkOut, maxGuests, features, price
//     } = req.body;
    
//     jwt.verify(token, tokenSecret, {}, async (err, userInfo) => {
//         if (err) throw err;
//         const PlaceDoc = await Place.findById(id);  
//         if(userInfo.id === PlaceDoc.owner.toString()) {
//             PlaceDoc.set({title, address, description,photos:addedPhotos, checkIn, price, checkOut, maxGuests, features});
//             await PlaceDoc.save();
//             res.json("Place details updated!");
//         }
//     });
// });

// app.get('/places', async(_, res) => {
//     res.json( await Place.find());
// })


// app.post('/bookings', async (req, res) => {
//     const {token} = req.cookies;
//     jwt.verify(token, tokenSecret, {}, async (err, userInfo) => {
//         if (err) throw err;
//         const {place, checkIn, checkOut, noOfGuests,price, noOfNights} = req.body;    
//         await Booking.create({
//             place,user: userInfo.id, checkIn, checkOut, noOfGuests, noOfNights, price
//         }).then((booking) => {
//             res.json(booking);
//         }).catch((err) => {
//             throw err;
//         });
//     })
    
// });

// app.get('/bookings', async (req, res) => {
//     const {token} = req.cookies;
//     jwt.verify(token, tokenSecret, {}, async (err, userInfo) => {
//         if (err) throw err;
//         const response = await Booking.find({user:userInfo.id}).populate('place');
//         res.json(response);
//     })
// })

// // app.listen(4000, ()=>{
// //     console.log("Server running on Port 4000");
// // });