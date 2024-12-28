const { MESSAGE_CONSTANTS } = require("../utils/constants");
const Output = require("../utils/output");
const orderService = require("../service/orderService");

const getOrders = async (req, res) => {
  try {
    const paylaod = {};
    const { leadId } = req.query;
    if (leadId) paylaod.lead = leadId;

    const data = await orderService.getOrders(paylaod);

    return Output.success(
      res,
      MESSAGE_CONSTANTS.SUCCESSFULLY_GET_ALL_ORDERS,
      data
    );
  } catch (error) {
    return Output.error(res, error);
  }
};

const addOrder = async (req, res) => {
  try {
    console.log(1);

    const data = await orderService.addOrder({
      ...req.body,
      userId: req.user._id.toString(),
    });

    return Output.success(
      res,
      MESSAGE_CONSTANTS.SUCCESSFULLY_ADDED_ORDER_TO_LEAD,
      data
    );
  } catch (error) {
    return Output.error(res, error);
  }
};

const getTopPerformingLeads = async (req, res) => {
  try {
    const data = await orderService.getTopPerformingLeads({});

    return Output.success(
      res,
      MESSAGE_CONSTANTS.SUCCESSFULLY_GET_TOP_PERFORMING_LEADS,
      data
    );
  } catch (error) {
    return Output.error(res, error);
  }
};

module.exports = {
  getOrders,
  addOrder,
  getTopPerformingLeads,
};
