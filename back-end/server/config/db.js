import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export async function connectDB() {
    if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
        return mongoose.connection;
    }

    const uri = process.env.MONGODB_URI;

    if (!uri) {
        throw new Error("MONGODB_URI is not set.");
    }

    try {
        await mongoose.connect(uri);
        console.log("MongoDB connected!");
        return mongoose.connection;
    } catch (err) {
        console.error("MongoDB could not connect:", err.message);
        throw new Error("Database connection failed.");
    }
}
