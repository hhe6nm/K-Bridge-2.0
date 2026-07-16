import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const apiClient = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

export const fetchInsights = async () => (await apiClient.get("/insights")).data;
export const fetchInsight = async (slug) => (await apiClient.get(`/insights/${slug}`)).data;
export const submitContact = async (payload) => (await apiClient.post("/contact", payload)).data;
