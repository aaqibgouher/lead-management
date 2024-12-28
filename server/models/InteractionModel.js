const mongoose = require("mongoose");
const {
  MODEL_CONSTANTS,
  INTERACTION_TYPE_CONSTANTS,
  LEADS_STATUS_CONSTATNS,
  STATUS_CONSTANTS,
} = require("../utils/constants");
const { required } = require("joi");

// interactions schema
const interactionSchema = new mongoose.Schema(
  {
    lead: {
      type: mongoose.Types.ObjectId,
      ref: MODEL_CONSTANTS.LEAD.MODEL,
      required: true,
    },
    poc: {
      type: mongoose.Types.ObjectId,
      ref: MODEL_CONSTANTS.POC.MODEL,
      default: null,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: MODEL_CONSTANTS.USER.MODEL,
      required: true,
    },
    type: {
      type: String,
      enum: [...Object.keys(INTERACTION_TYPE_CONSTANTS)],
      default: INTERACTION_TYPE_CONSTANTS.CALL.value,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: [...Object.values(STATUS_CONSTANTS)],
      default: STATUS_CONSTANTS.ACTIVE,
    },
  },
  { timestamps: true }
);

// model
const InteractionModel = mongoose.model(
  MODEL_CONSTANTS.INTERACTION.MODEL,
  interactionSchema,
  MODEL_CONSTANTS.INTERACTION.TABLE
);

// exporting model
module.exports = InteractionModel;
