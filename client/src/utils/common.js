import moment from "moment";

export const formatDate = (date) => {
  return moment(date).format("YYYY-MM-DD");
};

export const getParsedUserData = () => {
  const userData = localStorage.getItem("userData");

  // Parse userData if it's stored as JSON
  const parsedUserData = userData ? JSON.parse(userData) : null;

  return parsedUserData;
};

export const getParsedConfigData = () => {
  const configs = localStorage.getItem("configs");

  // Parse userData if it's stored as JSON
  const parsedConfigs = configs ? JSON.parse(configs) : null;

  return parsedConfigs;
};

export const getToken = () => {
  const parsedUserData = getParsedUserData();
  return parsedUserData?.token || null;
};

export const setData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeData = (key) => {
  localStorage.removeItem(key);
};

export const getConfigByKey = (key) => {
  const config = getParsedConfigData();
  return config[key] || null;
};
