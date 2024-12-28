const { MESSAGE_CONSTANTS, STATUS_CONSTANTS } = require("../utils/constants");
const Output = require("../utils/output");
const JWT = require("../utils/helper");
const authService = require("../service/authService");

const isAuthenticated = async (req, res, next) => {
  try {
    const { authorization: token } = req.headers;

    // if token not true
    if (!token) throw MESSAGE_CONSTANTS.TOKEN_IS_REQUIRED;

    // verify token
    const decoded = await JWT.verifyJWT(token);

    // get user info, check if is_verified & status
    const user = await authService.getUser(
      { _id: decoded.userId, token },
      "-password"
    );

    if (!user) throw MESSAGE_CONSTANTS.INVALID_USER_TOKEN_LOGIN_AGAIN;
    if (!user.is_verified) throw MESSAGE_CONSTANTS.USER_IS_NOT_VERIFIED;
    if (user.status === STATUS_CONSTANTS.INACTIVE)
      throw MESSAGE_CONSTANTS.USER_IS_INACTIVE;

    // add to req
    req.user = user;

    next();
  } catch (error) {
    return await Output.error(res, error);
  }
};

module.exports = {
  isAuthenticated,
};
