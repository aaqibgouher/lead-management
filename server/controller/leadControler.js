const { MESSAGE_CONSTANTS } = require("../utils/constants");
const Output = require("../utils/output");
const leadService = require("../service/leadService");

const getLeads = async (req, res) => {
  try {
    const data = await leadService.getLeads({});

    return Output.success(
      res,
      MESSAGE_CONSTANTS.SUCCESSFULLY_GET_ALL_LEADS,
      data
    );
  } catch (error) {
    return Output.error(res, error);
  }
};

const addLead = async (req, res) => {
  try {
    const data = await leadService.addLead({
      ...req.body,
      userId: req.user._id.toString(),
    });

    return Output.success(res, MESSAGE_CONSTANTS.SUCCESSFULLY_ADDED_LEAD, data);
  } catch (error) {
    return Output.error(res, error);
  }
};

const getLead = async (req, res) => {
  try {
    const { leadId } = req.params;

    const data = await leadService.getLead({ _id: leadId });

    return Output.success(res, MESSAGE_CONSTANTS.SUCCESSFULLY_GET_LEAD, data);
  } catch (error) {
    return Output.error(res, error);
  }
};

const updateLead = async (req, res) => {
  try {
    const { leadId } = req.params;

    const data = await leadService.updateLead({ leadId, ...req.body });

    return Output.success(
      res,
      MESSAGE_CONSTANTS.SUCCESSFULLY_UPDATED_LEAD,
      data
    );
  } catch (error) {
    return Output.error(res, error);
  }
};

const deleteLead = async (req, res) => {
  try {
    const { leadId } = req.params;

    const data = await leadService.deleteLead({ leadId });

    return Output.success(
      res,
      MESSAGE_CONSTANTS.SUCCESSFULLY_DELETED_LEAD,
      data
    );
  } catch (error) {
    return Output.error(res, error);
  }
};

const getLeadsToCallToday = async (req, res) => {
  try {
    const data = await leadService.getLeadsToCallToday({});

    return Output.success(
      res,
      MESSAGE_CONSTANTS.SUCCESSFULLY_GET_TODAYS_LEADS,
      data
    );
  } catch (error) {
    return Output.error(res, error);
  }
};

const getTotalCount = async (req, res) => {
  try {
    const data = await leadService.getTotalCount({});

    return Output.success(
      res,
      MESSAGE_CONSTANTS.SUCCESSFULLY_GET_ALL_DATA_COUNT,
      data
    );
  } catch (error) {
    return Output.error(res, error);
  }
};

module.exports = {
  getLeads,
  addLead,
  getLead,
  updateLead,
  deleteLead,
  getLeadsToCallToday,
  getTotalCount,
};
