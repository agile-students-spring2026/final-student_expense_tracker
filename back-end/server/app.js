import express from "express";
import cors from "cors";

import {validationResult} from "express-validator"
import { createExpenseValidator, updateExpenseValidator, 
    expenseIdValidator, categoryNameValidator } from "./validators/expenseValidators.js";
import Expense from "./models/Expense.js";

const app = express();

app.use(cors());
app.use(express.json());

// ===== In-memory data =====

let users = [];

let budget = {
    incomeSources: [],
    fixedExpenses: [],
    period: "Monthly"
};

function formatExpense(expense) {
    return {
        id: expense._id.toString(),
        name: expense.name,
        amount: expense.amount,
        category: expense.category,
        details: expense.details,
        dateAdded: new Date(expense.dateAdded).toLocaleDateString()
    };
}

function validationErrors(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    return null;
}

// ===== Expense routes =====

app.get("/api/expenses", async (req, res) => {
    try {
        const expenses = await Expense.find().sort({createdAt: -1});
        res.json(expenses.map(formatExpense));
    } catch(err) {
        res.status(500).json({error: "Could not load expenses"});
    }
});

app.post("/api/expenses", createExpenseValidator, async (req, res) => {
    //const error = validateExpense(req.body);
    const errorResponse = validationErrors(req,res);
    if (errorResponse) return //res.status(400).json({ error });

    try {
        const newExpense = await Expense.create({
            userId: "000000000000000000000000",
            name: req.body.name.trim(),
            amount: req.body.amount,
            category: req.body.category || "",
            details: req.body.details || "",
            dateAdded: req.body.dateAdded || new Date()
        });
        //expenses.push(newExpense);
        res.status(201).json(formatExpense(newExpense));
    } catch (err) {
        res.status(500).json({error: "Could not creare expense"})
    }
});

app.put("/api/expenses/:id", updateExpenseValidator, async (req, res) => {
    //const id = Number(req.params.id);
    //const exists = expenses.find(e => e.id === id);
    /*if (!exists) return res.status(404).json({ error: "Expense not found." });

    if (req.body.amount !== undefined && isNaN(Number(req.body.amount))) {
        return res.status(400).json({ error: "Expense amount must be a number." });
    }

    expenses = expenses.map(e => e.id === id ? { ...e, ...req.body } : e);
    const updated = expenses.find(e => e.id === id);
    res.json(updated);*/

    const errorResponse = validationErrors(req,res);
    if (errorResponse) return;

    try {
        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            {
                name:req.body.name,
                amount:req.body.amount,
                category: req.body.category || "",
                details: req.body.details || ""
            },
            {returnDocument: 'after', runValidators:true}
        )

        if (!updatedExpense) {
            return res.status(404).json({error:"Expense not found"});
        }
        res.json(formatExpense(updatedExpense));
    } catch (err) {
        res.status(500).json({error:"Could not update expense"});
    }
});

app.delete("/api/expenses/:id", expenseIdValidator, async (req, res) => {
   /* const id = Number(req.params.id);
    expenses = expenses.filter(e => e.id !== id);
    res.json({ message: "Expense deleted" });*/
    const errorResponse = validationErrors(req,res);
    if (errorResponse) return;

    try {
        const deletedExpense = await Expense.findByIdAndDelete(req.params.id);

        if (!deletedExpense) {
            return res.status(404).json({error:"Expense not found"});
        }
        res.json({message:"Expense deleted"});
    } catch (err) {
        res.status(500).json({error:"Could not delete expense"});
    }
});

app.delete("/api/expenses/category/:categoryName", categoryNameValidator, async (req, res) => {
    /*const { categoryName } = req.params;
    expenses = expenses.filter(e => e.category !== categoryName);
    res.json({ message: "Category deleted" });*/

    const errorResponse = validationErrors(req,res);
    if (errorResponse) return;

    try {
        await Expense.deleteMany({category:req.params.categoryName});
        res.json({message:"Category deleted"});
    } catch (err) {
        res.status(500).json({error:"Could not delete expense"});
    }
});

// ===== Budget validation =====

function validateBudget(body) {
    if (body.incomeSources !== undefined && !Array.isArray(body.incomeSources)) {
        return "incomeSources must be an array.";
    }
    if (body.fixedExpenses !== undefined && !Array.isArray(body.fixedExpenses)) {
        return "fixedExpenses must be an array.";
    }
    const validPeriods = ["Monthly", "Weekly", "Yearly"];
    if (body.period !== undefined && !validPeriods.includes(body.period)) {
        return `period must be one of: ${validPeriods.join(", ")}.`;
    }
    return null;
}

// ===== Budget routes =====

app.get("/api/budget", (req, res) => {
    res.json(budget);
});

app.post("/api/budget", (req, res) => {
    const error = validateBudget(req.body);
    if (error) return res.status(400).json({ error });

    budget = {
        incomeSources: req.body.incomeSources || [],
        fixedExpenses: req.body.fixedExpenses || [],
        period: req.body.period || "Monthly"
    };
    res.status(201).json(budget);
});

app.put("/api/budget", (req, res) => {
    const error = validateBudget(req.body);
    if (error) return res.status(400).json({ error });

    if (req.body.incomeSources !== undefined) budget.incomeSources = req.body.incomeSources;
    if (req.body.fixedExpenses !== undefined) budget.fixedExpenses = req.body.fixedExpenses;
    if (req.body.period !== undefined) budget.period = req.body.period;

    res.json(budget);
});

app.delete("/api/budget", (req, res) => {
    budget = { incomeSources: [], fixedExpenses: [], period: "Monthly" };
    res.json({ message: "Budget reset." });
});

// ===== Auth =====

app.post("/api/logout", (req, res) => {
    res.status(200).json({ message: "Logout successful" });
});

app.post("/api/signup", (req, res) => {
    const { name, email, password, confirm } = req.body;

    if (!name || !email || !password || !confirm) {
        return res.status(400).json({ error: "All fields are required." });
    }
    if (password !== confirm) {
        return res.status(400).json({ error: "Passwords do not match." });
    }
    if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters." });
    }

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ error: "User already exists." });
    }

    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);

    res.status(201).json({ message: "User created.", userId: newUser.id, name: newUser.name });
});

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ error: "Invalid credentials." });
    }

    res.status(200).json({ message: "Login successful.", userId: user.id, name: user.name });
});



// ===== Profile Routes =====

app.get("/api/profile/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({
        id: user.id,
        name: user.name,
        email: user.email
    });
});

app.put("/api/profile/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ error: "User not found." });
    }

    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required." });
    }

    user.name = name;
    user.email = email;

    res.status(200).json({
        message: "Profile updated.",
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    });
});

export default app;