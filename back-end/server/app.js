import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

let expenses = [];

app.get("/api/health", (req,res) => {
    res.json({message: "Backend is working."})
});

app.get("/api/expenses", (req,res) => {
    res.json(expenses);
});

app.post("/api/expenses", (req,res) => {
    const newExpense = {
        id: Date.now(),
        name: req.body.name,
        amount: req.body.amount,
        category: req.body.category || "",
        details: req.body.details || "",
        dateAdded: req.body.dateAdded || new Date().toLocaleDateString()
    };
    expenses.push(newExpense);
    res.status(201).json(newExpense);
});

app.delete("/api/expenses/:id", (req,res) => {
    const id = Number(req.params.id);
    expenses = expenses.filter((expense) => expense.id !== id);
    res.json({message:"Expense deleted"});
});

app.delete("/api/categories/:categoryName", (req,res) => {
    const {categoryName} = req.params;
    expenses = expenses.filter((expense) => expense.category !== categoryName);
    res.json({message:"Category deleted"});
});

app.put("/api/expenses/:id", (req, res) => {
    const id = Number(req.params.id);

    expenses = expenses.map((expense) => {
        return expense.id === id ? {...expense, ...req.body} : expense
    });
    const updatedExpense = expenses.find((expense) => expense.id === id);
    res.json(updatedExpense);
})

export default app;