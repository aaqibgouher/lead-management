const interactionService = require("../service/interactionService");
const { MESSAGE_CONSTANTS } = require("../utils/constants");
const Output = require("../utils/output");

const getInteractions = async (req, res) => {
  try {
    const payload = {};
    const { leadId } = req.query;

    if (leadId) payload.lead = leadId;
    const data = await interactionService.getInteractions(payload);

    return Output.success(
      res,
      MESSAGE_CONSTANTS.SUCCESSFULLY_GET_ALL_INTERACTIONS,
      data
    );
  } catch (error) {
    return Output.error(res, error);
  }
};

const addInteraction = async (req, res) => {
  try {
    const data = await interactionService.addInteraction({
      ...req.body,
      userId: req.user._id.toString(),
    });

    return Output.success(
      res,
      MESSAGE_CONSTANTS.SUCCESSFULLY_ADDED_INTERACTION_TO_LEAD,
      data
    );
  } catch (error) {
    return Output.error(res, error);
  }
};

const getInteraction = async (req, res) => {
  try {
    const { interactionId } = req.params;

    const data = await interactionService.getInteraction({
      _id: interactionId,
    });

    return Output.success(
      res,
      MESSAGE_CONSTANTS.SUCCESSFULLY_GET_INTERACTION,
      data
    );
  } catch (error) {
    return Output.error(res, error);
  }
};

const updateInteraction = async (req, res) => {
  try {
    const { interactionId } = req.params;

    const data = await interactionService.updateInteraction({
      interactionId,
      ...req.body,
    });

    return Output.success(
      res,
      MESSAGE_CONSTANTS.SUCCESSFULLY_UPDATED_INTERACTION,
      data
    );
  } catch (error) {
    return Output.error(res, error);
  }
};

const deleteInteraction = async (req, res) => {
  try {
    const { interactionId } = req.params;

    const data = await interactionService.deleteInteraction({ interactionId });

    return Output.success(
      res,
      MESSAGE_CONSTANTS.SUCCESSFULLY_DELETED_INTERACTION,
      data
    );
  } catch (error) {
    return Output.error(res, error);
  }
};

module.exports = {
  getInteractions,
  addInteraction,
  getInteraction,
  updateInteraction,
  deleteInteraction,
};
