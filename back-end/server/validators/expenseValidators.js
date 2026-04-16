import {body,param} from "express-validator";

export const createExpenseValidator = [
    body("name").trim().notEmpty().withMessage("Expense name is required"),
    body("amount").isFloat({min:0}).withMessage("Amount must be greater than or equal to 0"),
    body("category").optional().trim(),
    body("details").optional().trim()
]

export const updateExpenseValidator = [
    param("id").isMongoId().withMessage("Invalid expense id"),
    body("name").trim().notEmpty().withMessage("Expense name is required"),
    body("amount").isFloat({min:0}).withMessage("Amount must be greater than or equal to 0"),
    body("category").optional().trim(),
    body("details").optional().trim()
]

export const expenseIdValidator = [
    param("id").isMongoId().withMessage("Invalid expense id")
]

export const categoryNameValidator = [
    param("categoryName").trim().notEmpty().withMessage("Caregory name is required")
]