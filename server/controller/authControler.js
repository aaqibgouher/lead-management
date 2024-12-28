const Output = require("../utils/output");
const authService = require("../service/authService");
const {
  MESSAGE_CONSTANTS,
  USER_ROLE_CONSTANTS,
  STATUS_CONSTANTS,
  LEADS_STATUS_CONSTATNS,
  TIMEZONE_CONSTANTS,
  POCS_ROLE,
  INTERACTION_TYPE_CONSTANTS,
  INTERACTION_CALL_FREQUENCY_TYPE,
  INTERACTION_WEEKLY_DAY,
  ORDER_STATUS_CONSTANTS,
} = require("../utils/constants");

const register = async (req, res) => {
  try {
    console.log(req.body, "from body ----");
    const data = await authService.register(req.body);

    return Output.success(res, MESSAGE_CONSTANTS.SUCCESSFULLY_REGISTERED, data);
  } catch (error) {
    return Output.error(res, error);
  }
};

const login = async (req, res) => {
  try {
    const data = await authService.login(req.body);

    return Output.success(res, MESSAGE_CONSTANTS.SUCCESSFULLY_REGISTERED, data);
  } catch (error) {
    return Output.error(res, error);
  }
};

const logout = async (req, res) => {
  try {
    const data = await authService.logout({ userId: req.user._id.toString() });

    return Output.success(res, MESSAGE_CONSTANTS.SUCCESSFULLY_LOGOUT, data);
  } catch (error) {
    return Output.error(res, error);
  }
};

const getMe = async (req, res) => {
  try {
    const data = req.user;

    return Output.success(
      res,
      MESSAGE_CONSTANTS.SUCCESSFULLY_GET_USER_INFO,
      data
    );
  } catch (error) {
    return Output.error(res, error);
  }
};

const getConfigs = async (req, res) => {
  try {
    const data = {
      USER_ROLE_CONSTANTS,
      STATUS_CONSTANTS,
      LEADS_STATUS_CONSTATNS,
      TIMEZONE_CONSTANTS,
      POCS_ROLE,
      INTERACTION_TYPE_CONSTANTS,
      INTERACTION_CALL_FREQUENCY_TYPE,
      INTERACTION_WEEKLY_DAY,
      ORDER_STATUS_CONSTANTS,
    };

    return Output.success(
      res,
      MESSAGE_CONSTANTS.SUCCESSFULLY_GET_CONFIGS,
      data
    );
  } catch (error) {
    return Output.error(res, error);
  }
};

module.exports = {
  register,
  login,
  logout,
  getMe,
  getConfigs,
};
