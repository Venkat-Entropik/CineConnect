// interceptor.js
import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const api = axios.create({
  baseURL: BASE_URL,
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  config => {
    if (TMDB_TOKEN) {
      config.headers.Authorization = `Bearer ${TMDB_TOKEN}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR (optional)
api.interceptors.response.use(
  response => response,
  error => {
    // You can log errors globally or show a toast
    console.error("API Error:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export { api };

export const fetchDataFromApi = async (url?: string, params?: unknown) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
    });
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
