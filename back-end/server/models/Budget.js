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

const splitSchema = new mongoose.Schema({
    needs: { type: Number, default: 50, min: 0, max: 100 },
    wants: { type: Number, default: 30, min: 0, max: 100 },
    savings: { type: Number, default: 20, min: 0, max: 100 }
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
        },
        split: {
            type: splitSchema,
            default: () => ({ needs: 50, wants: 30, savings: 20 })
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Budget", budgetSchema);