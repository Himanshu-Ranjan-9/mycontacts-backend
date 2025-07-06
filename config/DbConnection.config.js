import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URL;

export const dbConnection = async () => {
    try {
        await mongoose.connect(uri);
        console.log("✅ Connected to MongoDB");
    } catch (error) {
        console.log("❌ Error connecting to MongoDB:", error.message);
    }
};





















