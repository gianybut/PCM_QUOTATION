import axios from "axios";

export const BACKEND_SERVER_URL = "http://localhost:6942";

const api = axios.create({
  baseURL: BACKEND_SERVER_URL,
  timeout: 10000,
});

export default api;
