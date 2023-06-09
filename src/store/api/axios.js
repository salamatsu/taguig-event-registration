import axios from "axios";

export const axiosDefault = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export const axiosMultipart = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "content-type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
  },
});

export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    withCredentials: true,
  },
});
