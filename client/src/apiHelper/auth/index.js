import { apiRequest } from "..";

export const registerApiHelper = async (payload) => {
  return await apiRequest({
    url: "auth/register",
    method: "POST",
    data: payload,
  });
};

export const loginApiHelper = async (payload) => {
  return await apiRequest({
    url: "auth/login",
    method: "POST",
    data: payload,
  });
};

export const logoutApiHelper = async () => {
  return await apiRequest({
    url: "auth/logout",
    method: "POST",
  });
};

export const getConfigsApiHelper = async () => {
  return await apiRequest({
    url: "auth/configs",
    method: "GET",
  });
};
