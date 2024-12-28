const Output = require("../utils/output");
const pocService = require("../service/pocService");
const { MESSAGE_CONSTANTS } = require("../utils/constants");

const getPocs = async (req, res) => {
  try {
    const paylaod = {};
    const { leadId } = req.query;
    if (leadId) paylaod.lead = leadId;

    const data = await pocService.getPocs(paylaod);

    return Output.success(
      res,
      MESSAGE_CONSTANTS.SUCCESSFULLY_GET_ALL_POCS,
      data
    );
  } catch (error) {
    return Output.error(res, error);
  }
};

const addPoc = async (req, res) => {
  try {
    const data = await pocService.addPoc({
      ...req.body,
      userId: req.user._id.toString(),
    });

    return Output.success(
      res,
      MESSAGE_CONSTANTS.SUCCESSFULLY_ADDED_POC_TO_LEAD,
      data
    );
  } catch (error) {
    return Output.error(res, error);
  }
};

const getPoc = async (req, res) => {
  try {
    const { pocId } = req.params;

    const data = await pocService.getPoc({ _id: pocId });

    return Output.success(res, MESSAGE_CONSTANTS.SUCCESSFULLY_GET_POC, data);
  } catch (error) {
    return Output.error(res, error);
  }
};

const updatePoc = async (req, res) => {
  try {
    const { pocId } = req.params;

    const data = await pocService.updatePoc({ pocId, ...req.body });

    return Output.success(
      res,
      MESSAGE_CONSTANTS.SUCCESSFULLY_UPDATED_POC,
      data
    );
  } catch (error) {
    return Output.error(res, error);
  }
};

const deletePoc = async (req, res) => {
  try {
    const { pocId } = req.params;

    const data = await pocService.deletePoc({ pocId });

    return Output.success(
      res,
      MESSAGE_CONSTANTS.SUCCESSFULLY_DELETED_POC,
      data
    );
  } catch (error) {
    return Output.error(res, error);
  }
};

module.exports = {
  getPocs,
  addPoc,
  getPoc,
  updatePoc,
  deletePoc,
};
