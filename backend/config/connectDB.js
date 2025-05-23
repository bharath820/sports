import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()
if(!process.env.MONGODB_URI){
    throw new Error("Please Provide MONGODB URL", {dbName: "MONGODB_URL"});
}

const connectDB = async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`, {dbName:"sportsclub"});
        console.log('MONGODB CONNECTED SUCCESSFULLY')
    } catch (error) {
        console.log('MONGODB CONNECTION FAILED', error)
        process.exit(1)
    }
}
export default connectDB