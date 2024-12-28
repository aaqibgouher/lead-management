const express = require("mongoose");
const {
  MODEL_CONSTANTS,
  STATUS_CONSTANTS,
  ORDER_STATUS_CONSTANTS,
} = require("../utils/constants");
const mongoose = require("mongoose");

// orders schema
const orderSchema = new mongoose.Schema(
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
    order_id: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    net_price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [...Object.values(ORDER_STATUS_CONSTANTS)],
      default: ORDER_STATUS_CONSTANTS.IN_PROGRESS,
    },
  },
  { timestamps: true }
);

// model
const OrderModel = mongoose.model(
  MODEL_CONSTANTS.ORDER.MODEL,
  orderSchema,
  MODEL_CONSTANTS.ORDER.TABLE
);

// exporting model
module.exports = OrderModel;
