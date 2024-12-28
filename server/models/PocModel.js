const mongoose = require("mongoose");
const {
  MODEL_CONSTANTS,
  POCS_ROLE,
  STATUS_CONSTANTS,
} = require("../utils/constants");

// poc schema
const pocSchema = new mongoose.Schema(
  {
    lead: {
      type: mongoose.Types.ObjectId,
      ref: MODEL_CONSTANTS.LEAD.MODEL,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: MODEL_CONSTANTS.USER.MODEL,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [...Object.keys(POCS_ROLE)],
      default: POCS_ROLE.OTHERS.value,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
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
const PocModel = mongoose.model(
  MODEL_CONSTANTS.POC.MODEL,
  pocSchema,
  MODEL_CONSTANTS.POC.TABLE
);

// exporting model
module.exports = PocModel;
