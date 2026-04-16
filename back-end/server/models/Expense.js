import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {type:String, required:true, trim:true},
    amount: {type:Number, required:true, min:0},
    category: {type:String, trim:true, default:""},
    details: {type:String, trim:true, default:""},
    dateAdded: {type:Date, default:Date.now}
},
{timestamps: true}
);

export default mongoose.model("Expense", expenseSchema);