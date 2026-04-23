import { body, param } from "express-validator";

export const updateProfileValidator = [
  param("id").isMongoId().withMessage("Invalid user id"),
  body("name").trim().notEmpty().withMessage("Name and email are required."),
  body("email").trim().notEmpty().withMessage("Name and email are required."),
  body("email").isEmail().withMessage("Please enter a valid email."),
  body("currencyPreference")
    .optional()
    .trim()
    .isIn(["USD", "EUR", "GBP", "CAD"])
    .withMessage("Invalid currency preference")
];