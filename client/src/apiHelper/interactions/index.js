import { apiRequest } from "..";

export const getInteractionsByLeadIdApiHelper = async (leadId) => {
  return await apiRequest({
    url: `leads/interactions?leadId=${leadId}`,
    method: "GET",
  });
};

export const addInteractionApiHelper = async (payload) => {
  return await apiRequest({
    url: `leads/interactions`,
    method: "POST",
    data: payload,
  });
};

export const getInteractionByIdApiHelper = async (interactionId) => {
  return await apiRequest({
    url: `leads/interactions/${interactionId}`,
    method: "GET",
  });
};

export const editInteractionByIdApiHelper = async (interactionId, payload) => {
  return await apiRequest({
    url: `leads/interactions/${interactionId}`,
    method: "PUT",
    data: payload,
  });
};

export const deleteInteractionByIdApiHelper = async (interactionId) => {
  return await apiRequest({
    url: `leads/interactions/${interactionId}`,
    method: "DELETE",
  });
};
