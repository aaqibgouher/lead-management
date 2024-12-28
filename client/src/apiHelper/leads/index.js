import { apiRequest } from "..";

export const getStatsApiHelper = async () => {
  return await apiRequest({
    url: "leads/stats",
    method: "GET",
  });
};

export const getTodaysLeadsApiHelper = async () => {
  return await apiRequest({
    url: "leads/today",
    method: "GET",
  });
};

export const getLeadsApiHelper = async () => {
  return await apiRequest({
    url: "leads",
    method: "GET",
  });
};

export const addLeadApiHelper = async (payload) => {
  return await apiRequest({
    url: "leads",
    method: "POST",
    data: payload,
  });
};

export const getLeadByIdApiHelper = async (payload) => {
  return await apiRequest({
    url: `leads/${payload?.leadId}`,
    method: "GET",
  });
};

export const editLeadApiHelper = async (leadId, payload) => {
  return await apiRequest({
    url: `leads/${leadId}`,
    method: "PUT",
    data: payload,
  });
};

export const deleteLeadApiHelper = async (leadId) => {
  return await apiRequest({
    url: `leads/${leadId}`,
    method: "DELETE",
  });
};

export const getTopPerformingLeadsApiHelper = async () => {
  return await apiRequest({
    url: "leads/orders/top-performing-leads",
    method: "GET",
  });
};
