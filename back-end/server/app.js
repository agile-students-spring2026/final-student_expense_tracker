import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import User from "./models/User.js";
import { requireAuth } from "./middleware/auth.js";
import { connectDB } from "./config/db.js";
import { hashPassword, verifyPassword } from "./utils/password.js";

const app = express();
const DEFAULT_JWT_SECRET = "dev-jwt-secret";

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

function formatValidationError(result) {
    const [firstError] = result.array();
    return firstError?.msg || "Invalid request.";
}

function normalizeEmail(email) {
    return email.trim().toLowerCase();
}

function createAuthToken(user) {
    return jwt.sign(
        { id: user._id.toString() },
        process.env.JWT_SECRET || DEFAULT_JWT_SECRET,
        { expiresIn: "7d" }
    );
}

function sanitizeUser(user) {
    return {
        id: user._id.toString(),
        name: user.name,
        email: user.email
    };
}

async function ensureAuthDatabase() {
    await connectDB();
}

const signupValidation = [
    body("name").trim().notEmpty().withMessage("All fields are required."),
    body("email").trim().notEmpty().withMessage("All fields are required."),
    body("password").notEmpty().withMessage("All fields are required."),
    body("confirm").notEmpty().withMessage("All fields are required."),
    body("email").isEmail().withMessage("Please enter a valid email."),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters."),
    body("confirm")
        .custom((confirm, { req }) => confirm === req.body.password)
        .withMessage("Passwords do not match.")
];

const loginValidation = [
    body("email").trim().notEmpty().withMessage("Email and password are required."),
    body("password").notEmpty().withMessage("Email and password are required."),
    body("email").isEmail().withMessage("Please enter a valid email.")
];

const profileValidation = [
    body("name").trim().notEmpty().withMessage("Name and email are required."),
    body("email").trim().notEmpty().withMessage("Name and email are required."),
    body("email").isEmail().withMessage("Please enter a valid email.")
];

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

app.post("/api/signup", signupValidation, async (req, res) => {
    const validation = validationResult(req);
    if (!validation.isEmpty()) {
        return res.status(400).json({ error: formatValidationError(validation) });
    }

    await ensureAuthDatabase();

    const name = req.body.name.trim();
    const email = normalizeEmail(req.body.email);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: "User already exists." });
    }

    const newUser = await User.create({
        name,
        email,
        password: hashPassword(req.body.password)
    });

    const token = createAuthToken(newUser);
    const safeUser = sanitizeUser(newUser);

    res.status(201).json({
        message: "User created.",
        userId: safeUser.id,
        name: safeUser.name,
        token,
        user: safeUser
    });
});

app.post("/api/login", loginValidation, async (req, res) => {
    const validation = validationResult(req);
    if (!validation.isEmpty()) {
        return res.status(400).json({ error: formatValidationError(validation) });
    }

    await ensureAuthDatabase();

    const email = normalizeEmail(req.body.email);
    const user = await User.findOne({ email });

    if (!user || !verifyPassword(req.body.password, user.password)) {
        return res.status(401).json({ error: "Invalid credentials." });
    }

    const token = createAuthToken(user);
    const safeUser = sanitizeUser(user);

    res.status(200).json({
        message: "Login successful.",
        userId: safeUser.id,
        name: safeUser.name,
        token,
        user: safeUser
    });
});

export default app;



// ===== Profile Routes =====

app.get("/api/profile/me", requireAuth, async (req, res) => {
    await ensureAuthDatabase();

    const user = await User.findById(req.user.id);

    if (!user) {
        return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(sanitizeUser(user));
});

app.get("/api/profile/:id", requireAuth, async (req, res) => {
    await ensureAuthDatabase();

    if (req.params.id !== req.user.id) {
        return res.status(403).json({ error: "Forbidden." });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
        return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(sanitizeUser(user));
});

app.put("/api/profile/me", requireAuth, profileValidation, async (req, res) => {
    const validation = validationResult(req);
    if (!validation.isEmpty()) {
        return res.status(400).json({ error: formatValidationError(validation) });
    }

    await ensureAuthDatabase();

    const email = normalizeEmail(req.body.email);
    const existingUser = await User.findOne({
        email,
        _id: { $ne: req.user.id }
    });

    if (existingUser) {
        return res.status(400).json({ error: "User already exists." });
    }

    const user = await User.findByIdAndUpdate(
        req.user.id,
        {
            name: req.body.name.trim(),
            email
        },
        {
            new: true,
            runValidators: true
        }
    );

    if (!user) {
        return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({
        message: "Profile updated.",
        user: sanitizeUser(user)
    });
});

app.put("/api/profile/:id", requireAuth, profileValidation, async (req, res) => {
    if (req.params.id !== req.user.id) {
        return res.status(403).json({ error: "Forbidden." });
    }

    const validation = validationResult(req);
    if (!validation.isEmpty()) {
        return res.status(400).json({ error: formatValidationError(validation) });
    }

    await ensureAuthDatabase();

    const email = normalizeEmail(req.body.email);
    const existingUser = await User.findOne({
        email,
        _id: { $ne: req.user.id }
    });

    if (existingUser) {
        return res.status(400).json({ error: "User already exists." });
    }

    const user = await User.findByIdAndUpdate(
        req.user.id,
        {
            name: req.body.name.trim(),
            email
        },
        {
            new: true,
            runValidators: true
        }
    );

    if (!user) {
        return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({
        message: "Profile updated.",
        user: sanitizeUser(user)
    });
});
