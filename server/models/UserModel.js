const mongoose = require("mongoose");
const {
  USER_ROLE_CONSTANTS,
  STATUS_CONSTANTS,
  MODEL_CONSTANTS,
} = require("../utils/constants");

// user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [...Object.values(USER_ROLE_CONSTANTS)],
      default: USER_ROLE_CONSTANTS.KAM,
    },
    token: {
      type: String,
      default: "",
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: [...Object.values(STATUS_CONSTANTS)],
      default: STATUS_CONSTANTS.INACTIVE,
    },
  },
  { timestamps: true }
);

// model
const UserModel = mongoose.model(
  MODEL_CONSTANTS.USER.MODEL,
  userSchema,
  MODEL_CONSTANTS.USER.TABLE
);

// exporting model
module.exports = UserModel;
