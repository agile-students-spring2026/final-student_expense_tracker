import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// ===== In-memory data =====

let users = [];
let expenses = [];

let budget = {
    incomeSources: [],
    fixedExpenses: [],
    period: "Monthly"
};

// ===== Expense validation =====

function validateExpense(body) {
    if (!body.name || typeof body.name !== "string" || !body.name.trim()) {
        return "Expense name is required.";
    }
    if (body.amount === undefined || body.amount === "") {
        return "Expense amount is required.";
    }
    if (isNaN(Number(body.amount))) {
        return "Expense amount must be a number.";
    }
    return null;
}

// ===== Expense routes =====

app.get("/api/expenses", (req, res) => {
    res.json(expenses);
});

app.post("/api/expenses", (req, res) => {
    const error = validateExpense(req.body);
    if (error) return res.status(400).json({ error });

    const newExpense = {
        id: Date.now(),
        name: req.body.name.trim(),
        amount: req.body.amount,
        category: req.body.category || "",
        details: req.body.details || "",
        dateAdded: req.body.dateAdded || new Date().toLocaleDateString()
    };
    expenses.push(newExpense);
    res.status(201).json(newExpense);
});

app.put("/api/expenses/:id", (req, res) => {
    const id = Number(req.params.id);
    const exists = expenses.find(e => e.id === id);
    if (!exists) return res.status(404).json({ error: "Expense not found." });

    if (req.body.amount !== undefined && isNaN(Number(req.body.amount))) {
        return res.status(400).json({ error: "Expense amount must be a number." });
    }

    expenses = expenses.map(e => e.id === id ? { ...e, ...req.body } : e);
    const updated = expenses.find(e => e.id === id);
    res.json(updated);
});

app.delete("/api/expenses/:id", (req, res) => {
    const id = Number(req.params.id);
    expenses = expenses.filter(e => e.id !== id);
    res.json({ message: "Expense deleted" });
});

app.delete("/api/categories/:categoryName", (req, res) => {
    const { categoryName } = req.params;
    expenses = expenses.filter(e => e.category !== categoryName);
    res.json({ message: "Category deleted" });
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

export default app;



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