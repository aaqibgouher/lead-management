import { apiRequest } from "..";

export const getOrdersByLeadIdApiHelper = async (leadId) => {
  return await apiRequest({
    url: `leads/orders?leadId=${leadId}`,
    method: "GET",
  });
};

export const addOrderByLeadIdApiHelper = async (payload) => {
  return await apiRequest({
    url: `leads/orders`,
    method: "POST",
    data: payload,
  });
};
