const USER_ROLE_CONSTANTS = {
  KAM: "KAM",
  OTHERS: "OTHERS",
};

const STATUS_CONSTANTS = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  DELETED: "DELETED",
};

const LEADS_STATUS_CONSTATNS = {
  NEW: "NEW",
  CONTACTED: " CONTACTED",
  QUALIFIED: "QUALIFIED",
  LOST: "LOST",
  DELETED: "DELETED",
};

const TIMEZONE_CONSTANTS = {
  UTC: "UTC",
  PST: "PST",
  EST: "EST",
  IST: "IST",
  CET: "CET",
};

const MODEL_CONSTANTS = {
  USER: {
    MODEL: "UserModel",
    TABLE: "users",
  },
  LEAD: {
    MODEL: "LeadModel",
    TABLE: "leads",
  },
  POC: {
    MODEL: "PocModel",
    TABLE: "pocs",
  },
  INTERACTION: {
    MODEL: "InteractionModel",
    TABLE: "interactions",
  },
  ORDER: {
    MODEL: "OrderModel",
    TABLE: "orders",
  },
};

const POCS_ROLE = {
  OWNER: {
    label: "Owner",
    value: "OWNER",
  },
  MANAGER: {
    label: "Manager",
    value: "MANAGER",
  },
  CHEF: {
    label: "Chef",
    value: "CHEF",
  },
  WAITER: {
    label: "Waiter",
    value: "WAITER",
  },
  CASHIER: {
    label: "Cashier",
    value: "CASHIER",
  },
  HOST: {
    label: "Host",
    value: "HOST",
  },
  OTHERS: {
    label: "Others",
    value: "OTHERS",
  },
};

const MESSAGE_CONSTANTS = {
  USER_ALREADY_EXISTS_BY_EMAIL_OR_PHONE: "User already exists by email/phone",
  USER_NOT_FOUND: "User not found",
  SUCCESSFULLY_REGISTERED: "Successfully registered",
  SUCCESSFULLY_LOGIN: "Successfully login",
  USER_IS_NOT_VERIFIED: "User is not verified",
  USER_IS_INACTIVE: "User is inactive",
  USER_EMAIL_AND_PASSWORD_NOT_MATCHED: "Invalid email/password",
  SUCCESSFULLY_LOGOUT: "Successfully logout",
  TOKEN_IS_REQUIRED: "Token is required",
  INVALID_USER_TOKEN_LOGIN_AGAIN: "Invalid user token, please login again",
  SUCCESSFULLY_GET_ALL_LEADS: "Successfully get leads",
  SUCCESSFULLY_GET_TODAYS_LEADS: "Successfully get today's leads",
  SUCCESSFULLY_GET_USER_INFO: "Successfully get user info",
  SUCCESSFULLY_ADDED_LEAD: "Successfully added lead",
  SUCCESSFULLY_GET_LEAD: "Successfully get lead",
  SUCCESSFULLY_UPDATED_LEAD: "Successfully updated lead",
  SUCCESSFULLY_DELETED_LEAD: "Successfully deleted lead",
  LEAD_NOT_FOUND: "Lead not found",
  LEAD_ALREADY_DELETED: "Lead already deleted",
  SUCCESSFULLY_GET_ALL_POCS: "Successfully get pocs",
  SUCCESSFULLY_ADDED_POC_TO_LEAD: "Successfully added poc to lead",
  SUCCESSFULLY_GET_POC: "Successfully get poc",
  SUCCESSFULLY_UPDATED_POC: "Successfully updated poc",
  SUCCESSFULLY_DELETED_POC: "Successfully deleted poc",
  POC_NOT_FOUND: "Poc not found",
  POC_ALREADY_DELETED: "Poc already deleted",
  SUCCESSFULLY_GET_ALL_INTERACTIONS: "Successfully get interactions",
  SUCCESSFULLY_ADDED_INTERACTION_TO_LEAD:
    "Successfully added interaction to lead",
  SUCCESSFULLY_GET_INTERACTION: "Successfully get interaction",
  SUCCESSFULLY_UPDATED_INTERACTION: "Successfully updated interaction",
  INTERACTION_NOT_FOUND: "Interaction not found",
  SUCCESSFULLY_DELETED_INTERACTION: "Successfully deleted interaction",
  INTERACTION_ALREADY_DELETED: "Interaction already deleted",
  SUCCESSFULLY_GET_ALL_DATA_COUNT: "Successfully get total counts",
  SUCCESSFULLY_GET_CONFIGS: "Successfully get configs",
  SUCCESSFULLY_GET_ALL_ORDERS: "Successfully get orders",
  SUCCESSFULLY_ADDED_ORDER_TO_LEAD: "Successfully added order to lead",
  SUCCESSFULLY_GET_TOP_PERFORMING_LEADS:
    "Successfully get top performing leads",
};

const INTERACTION_TYPE_CONSTANTS = {
  CALL: {
    label: "Call",
    value: "CALL",
  },
  EMAIL: {
    label: "Email",
    value: "EMAIL",
  },
};

const INTERACTION_CALL_FREQUENCY_TYPE = {
  DAILY: {
    label: "Daily",
    value: "DAILY",
  },
  WEEKLY: {
    label: "Weekly",
    value: "WEEKLY",
  },
  MONTHLY: {
    label: "Monthly",
    value: "MONTHLY",
  },
  YEARLY: {
    label: "Yearly",
    value: "YEARLY",
  },
};

const INTERACTION_WEEKLY_DAY = {
  MONDAY: {
    label: "Monday",
    value: "MONDAY",
  },
  TUESDAY: {
    label: "Tuesday",
    value: "TUESDAY",
  },
  WEDNESDAY: {
    label: "Wednesday",
    value: "WEDNESDAY",
  },
  THURSDAY: {
    label: "Thursday",
    value: "THURSDAY",
  },
  FRIDAY: {
    label: "Friday",
    value: "FRIDAY",
  },
  SATURDAY: {
    label: "Saturday",
    value: "SATURDAY",
  },
  SUNDAY: {
    label: "Sunday",
    value: "SUNDAY",
  },
};

const ORDER_STATUS_CONSTANTS = {
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
};

module.exports = {
  USER_ROLE_CONSTANTS,
  STATUS_CONSTANTS,
  LEADS_STATUS_CONSTATNS,
  TIMEZONE_CONSTANTS,
  MODEL_CONSTANTS,
  POCS_ROLE,
  MESSAGE_CONSTANTS,
  INTERACTION_TYPE_CONSTANTS,
  INTERACTION_CALL_FREQUENCY_TYPE,
  INTERACTION_WEEKLY_DAY,
  ORDER_STATUS_CONSTANTS,
};
