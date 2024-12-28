const { InteractionModel, LeadModel } = require("../models");
const { MESSAGE_CONSTANTS, STATUS_CONSTANTS } = require("../utils/constants");
const interactionValidator = require("../validation/interactionValidator");

const getInteractions = async (payload) => {
  return await InteractionModel.find(payload)
    .populate("lead", "_id name owned_by description address status")
    .populate("poc", "_id name role email phone");
};

const addInteraction = async (payload) => {
  console.log(payload, "payload --");
  // validation
  const { error, value } = interactionValidator.addInteraction.validate(
    payload,
    {
      abortEarly: false,
    }
  );

  if (error) {
    throw error.details[0];
  }

  //   destructure
  const { leadId, userId, pocId, type, description, date } = payload;

  //   update last interaction in leads
  await LeadModel.findByIdAndUpdate(leadId, {
    last_interaction: {
      lead: leadId,
      poc: pocId ? pocId : null,
      type,
      description,
      date,
    },
  });

  //   add interaction
  return await InteractionModel.create({
    lead: leadId,
    user: userId,
    poc: pocId ? pocId : null,
    type,
    description,
    date,
  });
};

const getInteraction = async (payload) => {
  return await InteractionModel.findOne(payload)
    .populate("lead", "_id name owned_by description address status")
    .populate("poc", "_id name role email phone")
    .populate("user", "_id name email phone type");
};

const updateInteraction = async (payload) => {
  // validation
  const { error, value } = interactionValidator.updateInteraction.validate(
    payload,
    {
      abortEarly: false,
    }
  );

  if (error) {
    throw error.details[0];
  }

  //   destructure
  const { interactionId, type, description, date, status } = payload;

  //   check if interaction exists
  const interaction = await getInteraction({ _id: interactionId });

  if (!interaction) throw MESSAGE_CONSTANTS.INTERACTION_NOT_FOUND;

  // Prepare update data
  const updateData = {};
  if (type) updateData.type = type;
  if (description) updateData.description = description;
  if (date) updateData.date = date;
  if (status) updateData.status = status;

  return await InteractionModel.findByIdAndUpdate(interactionId, updateData, {
    new: true,
  });
};

const deleteInteraction = async (payload) => {
  // validation
  const { error, value } = interactionValidator.deleteInteraction.validate(
    payload,
    {
      abortEarly: false,
    }
  );

  if (error) {
    throw error.details[0];
  }

  //   destructure
  const { interactionId } = payload;

  //   check if interaction exists
  const interaction = await getInteraction({ _id: interactionId });

  if (!interaction) throw MESSAGE_CONSTANTS.INTERACTION_NOT_FOUND;

  //   if already deleted
  if (interaction.status === STATUS_CONSTANTS.DELETED)
    throw MESSAGE_CONSTANTS.INTERACTION_ALREADY_DELETED;

  //   update status to delete
  await InteractionModel.findByIdAndUpdate(
    interactionId,
    { status: STATUS_CONSTANTS.DELETED },
    {
      new: true,
    }
  );

  return true;
};

const getTotalInteractionCount = async (payload) => {
  return await InteractionModel.countDocuments(payload);
};

module.exports = {
  getInteractions,
  addInteraction,
  getInteraction,
  updateInteraction,
  deleteInteraction,
  getTotalInteractionCount,
};
