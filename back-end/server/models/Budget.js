import mongoose from "mongoose";

const incomeSourceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true
    }
}, { _id: false });

const fixedExpenseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true
    }
}, { _id: false });

const budgetSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },
        incomeSources: {
            type: [incomeSourceSchema],
            default: []
        },
        fixedExpenses: {
            type: [fixedExpenseSchema],
            default: []
        },
        period: {
            type: String,
            enum: ["Monthly", "Weekly", "Yearly"],
            default: "Monthly"
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Budget", budgetSchema);