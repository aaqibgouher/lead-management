const { LeadModel, PocModel } = require("../models");
const {
  LEADS_STATUS_CONSTATNS,
  MODEL_CONSTANTS,
  MESSAGE_CONSTANTS,
} = require("../utils/constants");
const leadValidator = require("../validation/leadValidator");
const moment = require("moment-timezone");
const pocService = require("./pocService");
const interactionService = require("./interactionService");

const getLeads = async (payload) => {
  return await LeadModel.find(payload).populate(
    "user",
    "_id name email phone type"
  );
};

const addLead = async (payload) => {
  // validation
  const { error, value } = leadValidator.addLead.validate(payload, {
    abortEarly: false,
  });

  if (error) {
    throw error.details[0];
  }

  //   destructure
  const {
    userId,
    name,
    ownedBy,
    description,
    address,
    timezone,
    frequencyType,
    weeklyDayOfWeek,
    monthlyDateOfMonth,
    yearlyDateOfYear,
  } = payload;

  //   add lead
  return await LeadModel.create({
    user: userId,
    name,
    owned_by: ownedBy,
    description,
    address,
    status: LEADS_STATUS_CONSTATNS.NEW,
    history: [{ status: LEADS_STATUS_CONSTATNS.NEW }],
    timezone,
    frequency_type: frequencyType,
    weekly_day_of_week: weeklyDayOfWeek,
    monthly_date_of_month: monthlyDateOfMonth,
    yearly_date_of_year: yearlyDateOfYear,
  });
};

const getLead = async (payload) => {
  return await LeadModel.findOne(payload).populate(
    "user",
    "_id name email phone type"
  );
};

const updateLead = async (payload) => {
  // validation
  const { error, value } = leadValidator.updateLead.validate(payload, {
    abortEarly: false,
  });

  if (error) {
    throw error.details[0];
  }

  //   destructure
  const {
    leadId,
    name,
    ownedBy,
    description,
    address,
    timezone,
    status,
    frequencyType,
    weeklyDayOfWeek,
    monthlyDateOfMonth,
    yearlyDateOfYear,
  } = payload;

  //   check if lead exists
  const lead = await getLead({ _id: leadId });

  if (!lead) throw MESSAGE_CONSTANTS.LEAD_NOT_FOUND;

  // Prepare update data
  const updateData = {};
  if (name) updateData.name = name;
  if (ownedBy) updateData.owned_by = ownedBy;
  if (description) updateData.description = description;
  if (address) updateData.address = address;
  if (timezone) updateData.timezone = timezone;
  if (frequencyType) updateData.frequency_type = frequencyType;
  if (weeklyDayOfWeek?.length) updateData.weekly_day_of_week = weeklyDayOfWeek;
  if (monthlyDateOfMonth?.length)
    updateData.monthly_date_of_month = monthlyDateOfMonth;
  if (yearlyDateOfYear?.length)
    updateData.yearly_date_of_year = yearlyDateOfYear;

  // Check if status is being updated
  if (status && status !== lead.status) {
    updateData.status = status;
    updateData.history = [
      ...lead.history,
      {
        status,
      },
    ];
  }

  return await LeadModel.findByIdAndUpdate(leadId, updateData, {
    new: true,
  });
};

const deleteLead = async (payload) => {
  // validation
  const { error, value } = leadValidator.deleteLead.validate(payload, {
    abortEarly: false,
  });

  if (error) {
    throw error.details[0];
  }

  //   destructure
  const { leadId } = payload;

  //   check if lead exists
  const lead = await getLead({ _id: leadId });

  if (!lead) throw MESSAGE_CONSTANTS.LEAD_NOT_FOUND;

  //   if already deleted
  if (lead.status === LEADS_STATUS_CONSTATNS.DELETED)
    throw MESSAGE_CONSTANTS.LEAD_ALREADY_DELETED;

  //   update status to delete
  await LeadModel.findByIdAndUpdate(
    leadId,
    { status: LEADS_STATUS_CONSTATNS.DELETED },
    {
      new: true,
    }
  );

  return true;
};

const getLeadsToCallToday = async (payload) => {
  const today = moment().tz("UTC");
  const currentDayOfWeek = today.format("dddd").toUpperCase(); // e.g., 'MONDAY'
  const currentDate = today.date(); // e.g., 25
  const currentMonthDay = today.format("MM-DD"); // e.g., '12-25'

  const pipeline = [
    {
      $addFields: {
        flag: {
          $switch: {
            branches: [
              // Daily leads (match today's day)
              {
                case: {
                  $eq: ["$frequency_type", "DAILY"],
                },
                then: true,
              },

              // Weekly leads (match today's day of the week)
              {
                case: {
                  $and: [
                    {
                      $eq: ["$frequency_type", "WEEKLY"],
                    },
                    {
                      $in: [currentDayOfWeek, "$weekly_day_of_week"],
                    },
                  ],
                },
                then: true,
              },

              // Monthly leads (match today's date)
              {
                case: {
                  $and: [
                    {
                      $eq: ["$frequency_type", "MONTHLY"],
                    },
                    {
                      $in: [currentDate, "$monthly_date_of_month"],
                    },
                  ],
                },
                then: true,
              },

              // Yearly leads (match month/year)
              {
                case: {
                  $and: [
                    {
                      $eq: ["$frequency_type", "YEARLY"],
                    },
                    {
                      $in: [currentMonthDay, "$yearly_date_of_year"],
                    },
                  ],
                },
                then: true,
              },
            ],
            default: false,
          },
        },
      },
    },

    // Filter matched documents
    { $match: { flag: true } },

    // lookup required details
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },

    // projection
    {
      $project: {
        _id: 1,
        "user._id": 1,
        "user.name": 1,
        "user.email": 1,
        "user.phone": 1,
        "user.type": 1,
        name: 1,
        owned_by: 1,
        description: 1,
        address: 1,
        status: 1,
        history: 1,
        timezone: 1,
        frequency_type: 1,
        weekly_day_of_week: 1,
        monthly_date_of_month: 1,
        yearly_date_of_year: 1,
        last_interaction: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    },
  ];

  return await LeadModel.aggregate(pipeline);
};

const getTotalLeadCount = async (payload) => {
  return await LeadModel.countDocuments({});
};

const getTotalCount = async (payload) => {
  const leadCount = await getTotalLeadCount(payload);
  const pocCount = await pocService.getTotalPocCount(payload);
  const interactionCount = await interactionService.getTotalInteractionCount(
    payload
  );

  return { leadCount, pocCount, interactionCount };
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
