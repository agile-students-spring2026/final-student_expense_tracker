import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema();

export default mongoose.model("Expense", expenseSchema);