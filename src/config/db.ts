import mongoose from "mongoose";
import {MONGO_URI} from "./environments";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (e) {
        console.error('Error', e);
        process.exit(1);
    }
};

export default connectDB;