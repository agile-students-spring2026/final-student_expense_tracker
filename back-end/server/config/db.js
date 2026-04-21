import mongoose from "mongoose";

export async function connectDB() {
    const uri = process.env.MONGODB_URI
    
    if (!uri) {
        throw new Error("error!!!")
    }

    try {
        await mongoose.connect(uri);
        console.log("MongoDB connected!")
    } catch (err) {
        console.error("MongoDB could not connect: ", err.message);
        process.exit(1);
    }
}