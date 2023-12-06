import axios from "axios";
import useSWR from "swr";
import { getAuthToken } from "./cookies";
import { TProduct } from "../interfaces";
import { TProductPageProps } from "../components/ProductComponent";

export const api = axios.create({
  baseURL: `https://lvr-server-5ud7.onrender.com`,
  headers: {
    Accept: "application/json, text/plain, */*",
  },
  // timeout: 155000,
});

api.interceptors.request.use((config) => {
  const authToken = getAuthToken();

  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  return config;
});
