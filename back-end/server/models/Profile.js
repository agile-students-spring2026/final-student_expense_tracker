import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    currencyPreference: {
      type: String,
      trim: true,
      default: "USD"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Profile", profileSchema);