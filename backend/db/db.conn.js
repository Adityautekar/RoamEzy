import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`\n Connected ! : DB HOST :
        ${connectionInstance.connection.host }`);
    } catch (error) {
        console.log("MONGODB connection FAILED! Incorrect DB Credentials : ", err);
        process.exit(1);
    }
}

export default connectDB;