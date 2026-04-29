import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import User from "./models/User.js";
import Budget from "./models/Budget.js";
import { requireAuth } from "./middleware/auth.js";
import { connectDB } from "./config/db.js";
import { hashPassword, verifyPassword } from "./utils/password.js";

import { createExpenseValidator, updateExpenseValidator,
    expenseIdValidator, categoryNameValidator } from "./validators/expenseValidators.js";
import Expense from "./models/Expense.js";

import Profile from "./models/Profile.js";
import { updateProfileValidator } from "./validators/profileValidators.js";

const app = express();
connectDB();
const DEFAULT_JWT_SECRET = "dev-jwt-secret";

app.use(cors());
app.use(express.json());

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
    const errorResponse = validationErrors(req,res);
    if (errorResponse) return;

    try {
        const newExpense = await Expense.create({
            userId: new mongoose.Types.ObjectId("000000000000000000000000"),
            name: req.body.name.trim(),
            amount: req.body.amount,
            category: req.body.category || "",
            details: req.body.details || "",
            dateAdded: req.body.dateAdded || new Date()
        });
        res.status(201).json(formatExpense(newExpense));
    } catch (err) {
        console.log("Expense create error:", err.message)
        res.status(500).json({error: "Could not create expense"})
    }
});

app.put("/api/expenses/:id", updateExpenseValidator, async (req, res) => {
    const errorResponse = validationErrors(req,res);
    if (errorResponse) return;

    try {
        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                amount: req.body.amount,
                category: req.body.category || "",
                details: req.body.details || ""
            },
            {returnDocument: 'after', runValidators: true}
        )

        if (!updatedExpense) {
            return res.status(404).json({error: "Expense not found"});
        }
        res.json(formatExpense(updatedExpense));
    } catch (err) {
        res.status(500).json({error: "Could not update expense"});
    }
});

app.delete("/api/expenses/:id", expenseIdValidator, async (req, res) => {
    const errorResponse = validationErrors(req,res);
    if (errorResponse) return;

    try {
        const deletedExpense = await Expense.findByIdAndDelete(req.params.id);

        if (!deletedExpense) {
            return res.status(404).json({error: "Expense not found"});
        }
        res.json({message: "Expense deleted"});
    } catch (err) {
        res.status(500).json({error: "Could not delete expense"});
    }
});

app.put("/api/expenses/category/:categoryName", categoryNameValidator, async (req, res) => {
    const {categoryName} = req.params;
    const {newCategoryName} = req.body;

    if (!newCategoryName || !newCategoryName.trim()) {
        return res.status(400).json({error: "New category name is required"});
    }

    try {
        await Expense.updateMany(
            {category: categoryName},
            {category: newCategoryName.trim()}
        );
        res.json({message: "Category renamed", newCategoryName: newCategoryName.trim()})
    } catch(err) {
        res.status(500).json({error: "Could not rename category"})
    }
});

app.delete("/api/expenses/category/:categoryName", categoryNameValidator, async (req, res) => {
    const errorResponse = validationErrors(req,res);
    if (errorResponse) return;

    try {
        await Expense.deleteMany({category: req.params.categoryName});
        res.json({message: "Category deleted"});
    } catch (err) {
        res.status(500).json({error: "Could not delete expense"});
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
    if (body.split !== undefined) {
        const { needs, wants, savings } = body.split
        if (Number(needs) + Number(wants) + Number(savings) !== 100) {
            return "Split percentages must add up to 100."
        }
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

function formatBudget(budget) {
    return {
        userId: budget.userId.toString(),
        incomeSources: budget.incomeSources,
        fixedExpenses: budget.fixedExpenses,
        period: budget.period,
        split: budget.split || { needs: 50, wants: 30, savings: 20 }
    };
}

app.get("/api/budget", requireAuth, async (req, res) => {
    try {
        await connectDB();
        const budget = await Budget.findOne({ userId: req.user.id });
        if (!budget) {
            return res.json({ incomeSources: [], fixedExpenses: [], period: "Monthly", split: { needs: 50, wants: 30, savings: 20 } });
        }
        res.json(formatBudget(budget));
    } catch (err) {
        res.status(500).json({ error: "Could not load budget." });
    }
});

app.post("/api/budget", requireAuth, async (req, res) => {
    const error = validateBudget(req.body);
    if (error) return res.status(400).json({ error });

    try {
        await connectDB();
        const budget = await Budget.findOneAndUpdate(
            { userId: req.user.id },
            {
                userId: req.user.id,
                incomeSources: req.body.incomeSources || [],
                fixedExpenses: req.body.fixedExpenses || [],
                period: req.body.period || "Monthly",
                split: req.body.split || { needs: 50, wants: 30, savings: 20 }
            },
            { upsert: true, new: true, runValidators: true }
        );
        res.status(201).json(formatBudget(budget));
    } catch (err) {
        res.status(500).json({ error: "Could not save budget." });
    }
});

app.put("/api/budget", requireAuth, async (req, res) => {
    const error = validateBudget(req.body);
    if (error) return res.status(400).json({ error });

    try {
        await connectDB();
        const updates = {};
        if (req.body.incomeSources !== undefined) updates.incomeSources = req.body.incomeSources;
        if (req.body.fixedExpenses !== undefined) updates.fixedExpenses = req.body.fixedExpenses;
        if (req.body.period !== undefined) updates.period = req.body.period;
        if (req.body.split !== undefined) updates.split = req.body.split;

        const budget = await Budget.findOneAndUpdate(
            { userId: req.user.id },
            updates,
            { new: true, runValidators: true }
        );

        if (!budget) {
            return res.status(404).json({ error: "Budget not found." });
        }
        res.json(formatBudget(budget));
    } catch (err) {
        res.status(500).json({ error: "Could not update budget." });
    }
});

app.delete("/api/budget", requireAuth, async (req, res) => {
    try {
        await connectDB();
        await Budget.findOneAndUpdate(
            { userId: req.user.id },
            { incomeSources: [], fixedExpenses: [], period: "Monthly", split: { needs: 50, wants: 30, savings: 20 } },
            { new: true }
        );
        res.json({ message: "Budget reset." });
    } catch (err) {
        res.status(500).json({ error: "Could not reset budget." });
    }
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

// ===== Profile Routes =====

app.get("/api/profile/me", requireAuth, async (req, res) => {
    await ensureAuthDatabase();

    const user = await User.findById(req.user.id);

    if (!user) {
        return res.status(404).json({ error: "User not found." });
    }

    let profile = await Profile.findOne({ userId: user._id });

    if (!profile) {
        profile = await Profile.create({
            userId: user._id,
            currencyPreference: "USD"
        });
    }

    res.status(200).json({
        ...sanitizeUser(user),
        currencyPreference: profile.currencyPreference
    });
});

app.get("/api/profile/:id", async (req, res) => {
    await ensureAuthDatabase();

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ error: "User not found." });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({ error: "User not found." });
    }

    let profile = await Profile.findOne({ userId: user._id });

    if (!profile) {
        profile = await Profile.create({
            userId: user._id,
            currencyPreference: "USD"
        });
    }

    res.status(200).json({
        ...sanitizeUser(user),
        currencyPreference: profile.currencyPreference
    });
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
        { name: req.body.name.trim(), email },
        { new: true, runValidators: true }
    );

    if (!user) {
        return res.status(404).json({ error: "User not found." });
    }

    let profile = await Profile.findOne({ userId: user._id });

    if (!profile) {
        profile = new Profile({
            userId: user._id,
            currencyPreference: req.body.currencyPreference || "USD"
        });
    } else if (req.body.currencyPreference) {
        profile.currencyPreference = req.body.currencyPreference;
    }

    await profile.save();

    res.status(200).json({
        message: "Profile updated.",
        user: { ...sanitizeUser(user), currencyPreference: profile.currencyPreference }
    });
});

app.put("/api/profile/:id", updateProfileValidator, async (req, res) => {
    const validation = validationResult(req);
    if (!validation.isEmpty()) {
        return res.status(400).json({ error: formatValidationError(validation) });
    }

    await ensureAuthDatabase();

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ error: "User not found." });
    }

    const email = normalizeEmail(req.body.email);
    const existingUser = await User.findOne({
        email,
        _id: { $ne: req.params.id }
    });

    if (existingUser) {
        return res.status(400).json({ error: "User already exists." });
    }

    const user = await User.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name.trim(), email },
        { new: true, runValidators: true }
    );

    if (!user) {
        return res.status(404).json({ error: "User not found." });
    }

    let profile = await Profile.findOne({ userId: user._id });

    if (!profile) {
        profile = new Profile({
            userId: user._id,
            currencyPreference: req.body.currencyPreference || "USD"
        });
    } else if (req.body.currencyPreference) {
        profile.currencyPreference = req.body.currencyPreference;
    }

    await profile.save();

    res.status(200).json({
        message: "Profile updated.",
        user: { ...sanitizeUser(user), currencyPreference: profile.currencyPreference }
    });
});

export default app;