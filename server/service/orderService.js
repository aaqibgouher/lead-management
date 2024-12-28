const { OrderModel } = require("../models");
const orderValidator = require("../validation/orderValidator");

const getOrders = async (payload) => {
  return await OrderModel.find(payload).populate(
    "lead",
    "_id name owned_by description address status"
  );
};

const addOrder = async (payload) => {
  // validation
  const { error, value } = orderValidator.addOrderValidator.validate(payload, {
    abortEarly: false,
  });

  if (error) {
    throw error.details[0];
  }

  //   destructure
  const { leadId, userId, orderId, price, discount, netPrice, status } =
    payload;

  //   add order
  return await OrderModel.create({
    lead: leadId,
    user: userId,
    order_id: orderId,
    price,
    discount,
    net_price: netPrice,
    status,
  });
};

const getTopPerformingLeads = async (payload) => {
  const pipeline = [
    {
      $group: {
        _id: "$lead",
        totalNetPrice: { $sum: "$net_price" },
      },
    },
    {
      $lookup: {
        from: "leads",
        localField: "_id",
        foreignField: "_id",
        as: "leadInfo",
      },
    },
    {
      $unwind: "$leadInfo",
    },
    {
      $project: {
        _id: 1,
        name: "$leadInfo.name",
        totalNetPrice: 1,
      },
    },
  ];

  return await OrderModel.aggregate(pipeline);
};

module.exports = {
  getOrders,
  addOrder,
  getTopPerformingLeads,
};
