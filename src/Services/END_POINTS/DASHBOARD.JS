import axios from "axios";

const baseURl = "https://us-central1-cmd-dash.cloudfunctions.net/api/";

export const axiosInstance = axios.create({ baseURL: baseURl });
export const AUTH_URL = {
  SIGN_IN: "login",
};
export const DEALS_URLS = {
  GET_DEALS: "deals",
  CREATE_DEAL: "deals",
  UPDATE_DEAL: (id) => `deals/${id}`,
  GET_DEAL: (id) => `deals/${id}`,
};
export const TASKS_URLS = {
  GET_TASKS: "tasks",
  CREATE_TASK: "tasks",
  UPDATE_TASK: (id) => `tasks/${id}`,
  GET_TASK: (id) => `tasks/${id}`,
};
export const CUSTOMERS_URLS = {
  GET_CUSTOMERS: "customers",
  CREATE_CUSTOMER: "customers",
  UPDATE_CUSTOMER: (id) => `customers/${id}`,
  GET_CUSTOMER: (id) => `customers/${id}`,
};
