const Joi = require("joi");
const {
  TIMEZONE_CONSTANTS,
  LEADS_STATUS_CONSTATNS,
  INTERACTION_TYPE_CONSTANTS,
  INTERACTION_CALL_FREQUENCY_TYPE,
  INTERACTION_WEEKLY_DAY,
} = require("../utils/constants");

const addLead = Joi.object({
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
  ownedBy: Joi.string().min(3).required().messages({
    "string.min": "Owned By must be at least 3 characters long",
    "any.required": "Owned By is required",
  }),
  description: Joi.string().allow("").messages({
    "string.base": "Description must be a string",
  }),
  address: Joi.string().min(3).required().messages({
    "string.min": "Address must be at least 3 characters long",
    "any.required": "Address is required",
  }),
  timezone: Joi.string()
    .valid(...Object.values(TIMEZONE_CONSTANTS))
    .default("UTC")
    .messages({
      "any.only": `Timezone must be one of ${Object.values(
        TIMEZONE_CONSTANTS
      ).join(", ")}`,
    }),
  frequencyType: Joi.string()
    .valid(...Object.keys(INTERACTION_CALL_FREQUENCY_TYPE))
    .default(INTERACTION_CALL_FREQUENCY_TYPE.WEEKLY.value)
    .messages({
      "any.only": `Frequency type must be one of ${Object.keys(
        INTERACTION_CALL_FREQUENCY_TYPE
      ).join(", ")}`,
    }),
  weeklyDayOfWeek: Joi.array()
    .items(Joi.string().valid(...Object.keys(INTERACTION_WEEKLY_DAY)))
    .default([])
    .messages({
      "array.base": "Weekly day of the week must be an array",
      "any.only": `Weekly day must be one of ${Object.keys(
        INTERACTION_WEEKLY_DAY
      ).join(", ")}`,
    }),
  monthlyDateOfMonth: Joi.array()
    .items(Joi.number().integer().min(1).max(31))
    .default([])
    .messages({
      "array.base": "Monthly date of the month must be an array of numbers",
      "number.min": "Monthly date of the month must be at least 1",
      "number.max": "Monthly date of the month cannot exceed 31",
    }),
  yearlyDateOfYear: Joi.array()
    .items(Joi.string().regex(/^\d{2}-\d{2}$/)) // Format: YYYY-MM-DD
    .default([])
    .messages({
      "array.base": "Yearly date of the year must be an array of dates",
      "string.pattern.base":
        "Yearly date of the year must be in YYYY-MM-DD format",
    }),
});

const updateLead = Joi.object({
  leadId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/) // Regular expression for MongoDB ObjectId
    .required()
    .messages({
      "string.pattern.base": "Lead ID must be a valid MongoDB ObjectId",
      "any.required": "Lead ID is required",
    }),
  name: Joi.string().min(3).required().messages({
    "string.min": "Name must be at least 3 characters long",
    "any.required": "Name is required",
  }),
  ownedBy: Joi.string().min(3).required().messages({
    "string.min": "Owned By must be at least 3 characters long",
    "any.required": "Owned By is required",
  }),
  description: Joi.string().allow("").messages({
    "string.base": "Description must be a string",
  }),
  address: Joi.string().min(3).required().messages({
    "string.min": "Address must be at least 3 characters long",
    "any.required": "Address is required",
  }),
  timezone: Joi.string()
    .valid(...Object.values(TIMEZONE_CONSTANTS))
    .default("UTC")
    .messages({
      "any.only": `Timezone must be one of ${Object.values(
        TIMEZONE_CONSTANTS
      ).join(", ")}`,
    }),
  status: Joi.string().messages({
    "any.required": "Status is required",
  }),
  frequencyType: Joi.string()
    .valid(...Object.keys(INTERACTION_CALL_FREQUENCY_TYPE))
    .default(INTERACTION_CALL_FREQUENCY_TYPE.WEEKLY.value)
    .messages({
      "any.only": `Frequency type must be one of ${Object.keys(
        INTERACTION_CALL_FREQUENCY_TYPE
      ).join(", ")}`,
    }),
  weeklyDayOfWeek: Joi.array()
    .items(Joi.string().valid(...Object.keys(INTERACTION_WEEKLY_DAY)))
    .default([])
    .messages({
      "array.base": "Weekly day of the week must be an array",
      "any.only": `Weekly day must be one of ${Object.keys(
        INTERACTION_WEEKLY_DAY
      ).join(", ")}`,
    }),
  monthlyDateOfMonth: Joi.array()
    .items(Joi.number().integer().min(1).max(31))
    .default([])
    .messages({
      "array.base": "Monthly date of the month must be an array of numbers",
      "number.min": "Monthly date of the month must be at least 1",
      "number.max": "Monthly date of the month cannot exceed 31",
    }),
  yearlyDateOfYear: Joi.array()
    .items(Joi.string().regex(/^\d{2}-\d{2}$/)) // Format: YYYY-MM-DD
    .default([])
    .messages({
      "array.base": "Yearly date of the year must be an array of dates",
      "string.pattern.base":
        "Yearly date of the year must be in YYYY-MM-DD format",
    }),
});

const deleteLead = Joi.object({
  leadId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "Lead ID must be a valid MongoDB ObjectId",
      "any.required": "Lead ID is required",
    }),
});

module.exports = {
  addLead,
  updateLead,
  deleteLead,
};
