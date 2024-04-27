import mongoose from "mongoose";
import { config } from "./config";

const connectDB= async ()=>{

    try {

        mongoose.connection.on("error",(err)=>{
            console.log("error in connecting to db : ",err);
        })
        mongoose.connection.on("connected", () => {
            console.log("Connected to database successfully");
        });

        await mongoose.connect(config.mongo_uri as string);

    } catch (error) {
        console.log("failed to connect to db ",error);
        process.exit(1);
    }

}

export default connectDB