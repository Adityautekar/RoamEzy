import  express  from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import bookingRouter from "./routes/Booking.routes.js";
import placeRouter from "./routes/place.routes.js";
import reviewRouter from "./routes/review.routes.js";
const app = express();

// used to handle cross origin process
app.use(cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
}));

//middleware to handle incoming json data
app.use(express.json({
    limit:"16kb"
}));

//middleware used to handle url encoding formats, extended supports nested object passing
// app.use(express.urlencoded({extended:true, limit : "16kb"}));

//middle ware used to store public assets like favicon , images , googlefonts etc.
app.use(express.static("public"));
//*app.use('/uploads' , express.static(process.cwd() + '/uploads'));

app.use(cookieParser());

app.use("/", userRouter)
app.use("/", bookingRouter)
app.use("/", placeRouter)
app.use("/", reviewRouter)
export {app}