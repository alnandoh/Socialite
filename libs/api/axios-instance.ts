import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosInstance2 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add auth token here
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    if (error.response.status === 401) {
      // Redirect to login page or refresh token
    }
    return Promise.reject(error);
  }
);
