const { UserModel } = require("../models");
const authValidator = require("../validation/authValidator");
const helperUtils = require("../utils/helper");
const { STATUS_CONSTANTS, MESSAGE_CONSTANTS } = require("../utils/constants");

const register = async (payload) => {
  // validation
  const { error, value } = authValidator.register.validate(payload, {
    abortEarly: false,
  });

  if (error) {
    throw error.details[0];
  }

  //   destructure
  const { name, email, phone, password, confirmPassword } = payload;

  //   check if user exists by email or phone
  const isExist = await getUser({
    $or: [{ email: email }, { phone: phone }],
  });

  //   if user exists, throw error
  if (isExist) throw MESSAGE_CONSTANTS.USER_ALREADY_EXISTS_BY_EMAIL_OR_PHONE;

  //   create user
  const user = await addUser({
    name,
    email,
    phone,
    password,
  });

  // create user token
  const token = await helperUtils.generateJWT({ userId: user._id });

  //   update token, is_verified & status to active
  const updatedUser = await updateUser(
    { _id: user._id },
    { token, is_verified: true, status: STATUS_CONSTANTS.ACTIVE }
  );

  return updatedUser;
};

const login = async (payload) => {
  // validation
  const { error, value } = authValidator.login.validate(payload, {
    abortEarly: false,
  });

  if (error) {
    throw error.details[0];
  }

  //   destructure
  const { email, password } = payload;

  //   check if user exist by email
  const user = await getUser({
    email,
  });

  if (!user) throw MESSAGE_CONSTANTS.USER_NOT_FOUND;

  //   if user is not verified
  if (!user.is_verified) throw MESSAGE_CONSTANTS.USER_IS_NOT_VERIFIED;

  //   if user is inactive
  if (user.status === STATUS_CONSTANTS.INACTIVE)
    throw MESSAGE_CONSTANTS.USER_IS_INACTIVE;

  //   match password
  if (user.password !== password)
    throw MESSAGE_CONSTANTS.USER_EMAIL_AND_PASSWORD_NOT_MATCHED;

  // create user token
  const token = await helperUtils.generateJWT({ userId: user._id });

  const updatedUser = await updateUser({ _id: user._id }, { token });

  return updatedUser;
};

const logout = async (payload) => {
  // validation
  console.log("payload", payload);
  const { error, value } = authValidator.logout.validate(payload, {
    abortEarly: false,
  });

  if (error) {
    throw error.details[0];
  }

  const { userId } = payload;

  //   for now, empty token for logout user
  await updateUser({ _id: userId }, { token: "" });

  return true;
};

const getUser = async (query, exclude = "") => {
  return UserModel.findOne(query).select(exclude);
};

const addUser = async (payload) => {
  return UserModel.create(payload);
};

const updateUser = async (condition, dataToUpdate) => {
  return await UserModel.findOneAndUpdate(
    condition,
    { $set: dataToUpdate },
    { new: true }
  ).select("-password");
};

module.exports = {
  register,
  getUser,
  addUser,
  updateUser,
  login,
  logout,
};
