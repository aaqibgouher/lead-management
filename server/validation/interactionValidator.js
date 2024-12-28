const Joi = require("joi");
const {
  INTERACTION_TYPE_CONSTANTS,
  STATUS_CONSTANTS,
} = require("../utils/constants");

const addInteraction = Joi.object({
  leadId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/) // MongoDB ObjectId regex
    .required()
    .messages({
      "string.pattern.base": "Lead ID must be a valid MongoDB ObjectId",
      "any.required": "Lead ID is required",
    }),
  pocId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/) // MongoDB ObjectId regex
    .allow(null, "")
    .messages({
      "string.pattern.base": "Poc ID must be a valid MongoDB ObjectId",
    }),
  userId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/) // MongoDB ObjectId regex
    .required()
    .messages({
      "string.pattern.base": "User ID must be a valid MongoDB ObjectId",
      "any.required": "User ID is required",
    }),
  type: Joi.string()
    .valid(...Object.keys(INTERACTION_TYPE_CONSTANTS))
    .default(INTERACTION_TYPE_CONSTANTS.CALL.value)
    .messages({
      "any.only": `Type must be one of ${Object.keys(
        INTERACTION_TYPE_CONSTANTS
      ).join(", ")}`,
    }),
  description: Joi.string().required().messages({
    "string.base": "Description must be a string",
    "any.required": "Description is required",
  }),
  date: Joi.date().messages({
    "date.base": "Date must be a valid date",
  }),
});

const updateInteraction = Joi.object({
  interactionId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/) // MongoDB ObjectId regex
    .required()
    .messages({
      "string.pattern.base": "Lead ID must be a valid MongoDB ObjectId",
      "any.required": "Lead ID is required",
    }),
  type: Joi.string()
    .valid(...Object.keys(INTERACTION_TYPE_CONSTANTS))
    .default(INTERACTION_TYPE_CONSTANTS.CALL.value)
    .messages({
      "any.only": `Type must be one of ${Object.keys(
        INTERACTION_TYPE_CONSTANTS
      ).join(", ")}`,
    }),
  description: Joi.string().required().messages({
    "string.base": "Description must be a string",
    "any.required": "Description is required",
  }),
  date: Joi.date().messages({
    "date.base": "Date must be a valid date",
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

const deleteInteraction = Joi.object({
  interactionId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.pattern.base": "Interaction ID must be a valid MongoDB ObjectId",
      "any.required": "Interaction ID is required",
    }),
});

module.exports = {
  addInteraction,
  updateInteraction,
  deleteInteraction,
};
