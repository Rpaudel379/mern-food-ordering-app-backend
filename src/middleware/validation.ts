import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("Addressline 1 must be a string"),
  body("city").isString().notEmpty().withMessage("City must be a string"),
  body("country").isString().notEmpty().withMessage("Country must be a string"),
  handleValidationErrors,
];

export const validateMyRestaurantRequest = [
  body("restaurantName").notEmpty().withMessage("Restaurant name is required"),
  body("city").notEmpty().withMessage("city  is required"),
  body("country").notEmpty().withMessage("country  is required"),
  body("deliveryPrice")
    .isFloat({ min: 0 })
    .withMessage("Delivery price must be a positive number"),

  body("estimatedDeliveryTime")
    .isInt({ min: 0 })
    .withMessage("estimatedDeliveryTime must be a positive number"),
  body("cuisines")
    .isArray()
    .withMessage("cuisines must be an array")
    .not()
    .isEmpty()
    .withMessage("cuisines array must not be empty"),
  body("menuItems").isArray().withMessage("menu items must be an array"),
  body("menuItems.*.name")
    .notEmpty()
    .withMessage("menu items name is required"),
  body("menuItems.*.price")
    .isFloat({ min: 0 })
    .withMessage("menu items price is required and must be a positive number"),
  handleValidationErrors,
];
