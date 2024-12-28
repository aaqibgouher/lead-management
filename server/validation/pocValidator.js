const Joi = require("joi");
const { POCS_ROLE, STATUS_CONSTANTS } = require("../utils/constants");

const addPoc = Joi.object({
  leadId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/) // Regular expression for MongoDB ObjectId
    .required()
    .messages({
      "string.pattern.base": "Lead ID must be a valid MongoDB ObjectId",
      "any.required": "Lead ID is required",
    }),
  userId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/) // Regular expression for MongoDB ObjectId
    .required()
    .messages({
      "string.pattern.base": "User ID must be a valid MongoDB ObjectId",
      "any.required": "User ID is required",
    }),
  name: Joi.string().min(3).required().messages({
    "string.min": "Name must be at least 3 characters long",
    "any.required": "Name is required",
  }),
  role: Joi.string()
    .valid(...Object.keys(POCS_ROLE))
    .default(POCS_ROLE.OTHERS.value)
    .messages({
      "any.only": `Role must be one of ${Object.keys(POCS_ROLE).join(", ")}`,
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Email must be a valid email address",
      "any.required": "Email is required",
    }),
  phone: Joi.string()
    .pattern(/^\d{10,15}$/) // Phone number validation for 10 to 15 digits
    .required()
    .messages({
      "string.pattern.base": "Phone number must be between 10 and 15 digits",
      "any.required": "Phone number is required",
    }),
  status: Joi.string()
    .valid(...Object.values(STATUS_CONSTANTS))
    .default(STATUS_CONSTANTS.ACTIVE)
    .messages({
      "any.only": `Status must be one of ${Object.values(STATUS_CONSTANTS).join(
        ", "
      )}`,
    }),
});

const updatePoc = Joi.object({
  pocId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/) // Regular expression for MongoDB ObjectId
    .required()
    .messages({
      "string.pattern.base": "Poc ID must be a valid MongoDB ObjectId",
      "any.required": "Poc ID is required",
    }),
  name: Joi.string().min(3).required().messages({
    "string.min": "Name must be at least 3 characters long",
    "any.required": "Name is required",
  }),
  role: Joi.string()
    .valid(...Object.keys(POCS_ROLE))
    .default(POCS_ROLE.OTHERS.value)
    .messages({
      "any.only": `Role must be one of ${Object.keys(POCS_ROLE).join(", ")}`,
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Email must be a valid email address",
      "any.required": "Email is required",
    }),
  phone: Joi.string()
    .pattern(/^\d{10,15}$/) // Phone number validation for 10 to 15 digits
    .required()
    .messages({
      "string.pattern.base": "Phone number must be between 10 and 15 digits",
      "any.required": "Phone number is required",
    }),
  status: Joi.string()
    .valid(...Object.values(STATUS_CONSTANTS))
    .default(STATUS_CONSTANTS.ACTIVE)
    .messages({
      "any.only": `Status must be one of ${Object.values(STATUS_CONSTANTS).join(
        ", "
      )}`,
    }),
});

const deletePoc = Joi.object({
  pocId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "Poc ID must be a valid MongoDB ObjectId",
      "any.required": "Poc ID is required",
    }),
});

module.exports = {
  addPoc,
  updatePoc,
  deletePoc,
};
