import mongoose from "mongoose";

const profileSchema = new mongoose.Schema();

export default mongoose.model("Profile", profileSchema);