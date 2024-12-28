import { apiRequest } from "..";

export const getPocsByLeadIdApiHelper = async (leadId) => {
  return await apiRequest({
    url: `leads/pocs?leadId=${leadId}`,
    method: "GET",
  });
};

export const addPocApiHelper = async (payload) => {
  return await apiRequest({
    url: `leads/pocs`,
    method: "POST",
    data: payload,
  });
};

export const getPocByIdApiHelper = async (pocId) => {
  return await apiRequest({
    url: `leads/pocs/${pocId}`,
    method: "GET",
  });
};

export const editPocApiHelper = async (pocId, payload) => {
  return await apiRequest({
    url: `leads/pocs/${pocId}`,
    method: "PUT",
    data: payload,
  });
};

export const deletePocApiHelper = async (pocId) => {
  return await apiRequest({
    url: `leads/pocs/${pocId}`,
    method: "DELETE",
  });
};
