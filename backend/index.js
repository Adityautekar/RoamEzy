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


