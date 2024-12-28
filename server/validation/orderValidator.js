const Joi = require("joi");
const { ORDER_STATUS_CONSTANTS } = require("../utils/constants");

// Validator for adding an order
const addOrderValidator = Joi.object({
  leadId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/) // MongoDB ObjectId regex
    .required()
    .messages({
      "string.pattern.base": "Lead ID must be a valid MongoDB ObjectId",
      "any.required": "Lead ID is required",
    }),

  userId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/) // MongoDB ObjectId regex
    .required()
    .messages({
      "string.pattern.base": "User ID must be a valid MongoDB ObjectId",
      "any.required": "User ID is required",
    }),

  orderId: Joi.string().required().messages({
    "string.base": "Order ID must be a string",
    "any.required": "Order ID is required",
  }),

  categories: Joi.array().items(Joi.string().required()).default([]).messages({
    "array.base": "Categories must be an array of strings",
  }),

  description: Joi.string().allow("").default("").messages({
    "string.base": "Description must be a string",
  }),

  price: Joi.number().required().messages({
    "number.base": "Price must be a number",
    "any.required": "Price is required",
  }),

  discount: Joi.number().default(0).messages({
    "number.base": "Discount must be a number",
  }),

  netPrice: Joi.number().required().messages({
    "number.base": "Net Price must be a number",
    "any.required": "Net Price is required",
  }),

  status: Joi.string()
    .valid(...Object.keys(ORDER_STATUS_CONSTANTS)) // Replace with ORDER_STATUS_CONSTANTS
    .default(ORDER_STATUS_CONSTANTS.IN_PROGRESS)
    .messages({
      "string.base": "Status must be a string",
      "any.only": `Status must be one of ${Object.keys(
        ORDER_STATUS_CONSTANTS
      ).join(", ")}`,
    }),
});

module.exports = { addOrderValidator };
