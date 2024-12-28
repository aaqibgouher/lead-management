const mongoose = require("mongoose");
const {
  LEADS_STATUS_CONSTATNS,
  TIMEZONE_CONSTANTS,
  MODEL_CONSTANTS,
  INTERACTION_CALL_FREQUENCY_TYPE,
  INTERACTION_WEEKLY_DAY,
  INTERACTION_TYPE_CONSTANTS,
} = require("../utils/constants");

const historySchema = new mongoose.Schema({
  status: {
    type: String,
    enum: [...Object.values(LEADS_STATUS_CONSTATNS)],
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const lastInteractionSchema = new mongoose.Schema({
  lead: {
    type: mongoose.Types.ObjectId,
    ref: MODEL_CONSTANTS.INTERACTION.MODEL,
    required: true,
  },
  poc: {
    type: mongoose.Types.ObjectId,
    ref: MODEL_CONSTANTS.POC.MODEL,
    default: null,
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
});

// leads schema
const leadsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: MODEL_CONSTANTS.USER.MODEL,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    owned_by: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [...Object.values(LEADS_STATUS_CONSTATNS)],
      default: LEADS_STATUS_CONSTATNS.NEW,
    },
    history: {
      type: [historySchema],
      default: [],
    },
    timezone: {
      type: String,
      enum: [...Object.keys(TIMEZONE_CONSTANTS)],
      default: TIMEZONE_CONSTANTS.UTC,
    },
    frequency_type: {
      type: String,
      enum: [...Object.keys(INTERACTION_CALL_FREQUENCY_TYPE)],
      default: INTERACTION_CALL_FREQUENCY_TYPE.WEEKLY.value,
    },
    weekly_day_of_week: {
      type: [String],
      enum: [...Object.keys(INTERACTION_WEEKLY_DAY)],
      default: [],
    },
    monthly_date_of_month: {
      type: [Number],
      default: [],
    },
    yearly_date_of_year: {
      type: [String],
      default: [],
    },
    last_interaction: {
      type: lastInteractionSchema,
      default: null,
    },
  },
  { timestamps: true }
);

// model
const LeadModel = mongoose.model(
  MODEL_CONSTANTS.LEAD.MODEL,
  leadsSchema,
  MODEL_CONSTANTS.LEAD.TABLE
);

// exporting model
module.exports = LeadModel;
