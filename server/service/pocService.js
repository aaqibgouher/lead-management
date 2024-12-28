const pocValidator = require("../validation/pocValidator");
const { PocModel } = require("../models");
const { MESSAGE_CONSTANTS, STATUS_CONSTANTS } = require("../utils/constants");

const getPocs = async (payload) => {
  return await PocModel.find(payload)
    .populate("lead", "_id name owned_by description address status")
    .populate("user", "_id name email phone type");
};

const addPoc = async (payload) => {
  console.log(payload, "payload --");
  // validation
  const { error, value } = pocValidator.addPoc.validate(payload, {
    abortEarly: false,
  });

  if (error) {
    throw error.details[0];
  }

  //   destructure
  const { leadId, userId, name, email, phone, role, status } = payload;

  //   add lead
  return await PocModel.create({
    lead: leadId,
    user: userId,
    name,
    role,
    email,
    phone,
    status,
  });
};

const getPoc = async (payload) => {
  return await PocModel.findOne(payload)
    .populate("lead", "_id name owned_by description address status")
    .populate("user", "_id name email phone type");
};

const updatePoc = async (payload) => {
  // validation
  const { error, value } = pocValidator.updatePoc.validate(payload, {
    abortEarly: false,
  });

  if (error) {
    throw error.details[0];
  }

  //   destructure
  const { pocId, name, role, email, phone, status } = payload;

  //   check if lead exists
  const poc = await getPoc({ _id: pocId });

  if (!poc) throw MESSAGE_CONSTANTS.POC_NOT_FOUND;

  // Prepare update data
  const updateData = {};
  if (name) updateData.name = name;
  if (role) updateData.role = role;
  if (email) updateData.email = email;
  if (phone) updateData.phone = phone;
  if (status) updateData.status = status;

  return await PocModel.findByIdAndUpdate(pocId, updateData, {
    new: true,
  });
};

const deletePoc = async (payload) => {
  // validation
  const { error, value } = pocValidator.deletePoc.validate(payload, {
    abortEarly: false,
  });

  if (error) {
    throw error.details[0];
  }

  //   destructure
  const { pocId } = payload;

  //   check if lead exists
  const poc = await getPoc({ _id: pocId });

  if (!poc) throw MESSAGE_CONSTANTS.POC_NOT_FOUND;

  //   if already deleted
  if (poc.status === STATUS_CONSTANTS.DELETED)
    throw MESSAGE_CONSTANTS.POC_ALREADY_DELETED;

  //   update status to delete
  await PocModel.findByIdAndUpdate(
    pocId,
    { status: STATUS_CONSTANTS.DELETED },
    {
      new: true,
    }
  );

  return true;
};

const getTotalPocCount = async (payload) => {
  return await PocModel.countDocuments({});
};

module.exports = {
  getPocs,
  addPoc,
  getPoc,
  updatePoc,
  deletePoc,
  getTotalPocCount,
};
