import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";
const TMDB_BEARER_TOKEN = process.env.TMDB_BEARER_TOKEN;

if (!TMDB_BEARER_TOKEN) {
  throw new Error("TMDB_BEARER_TOKEN environment variable is required");
}

// Create axios instance with default config
const tmdb: AxiosInstance = axios.create({
  baseURL: TMDB_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
    accept: "application/json",
  },
});

// Request interceptor for additional configuration if needed
tmdb.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
tmdb.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common TMDB API errors
    if (error.response?.status === 401) {
      console.error("TMDB API: Invalid API key");
    } else if (error.response?.status === 429) {
      console.error("TMDB API: Rate limit exceeded");
    } else if (error.response?.status >= 500) {
      console.error("TMDB API: Server error");
    }
    return Promise.reject(error);
  },
);

export default tmdb;
