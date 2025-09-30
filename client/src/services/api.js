import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // your backend URL
});

// Add a request interceptor to attach token automatically
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
