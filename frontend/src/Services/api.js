import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8090/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth headers to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["X-Auth-Token"] = token;
  }
  const user = localStorage.getItem("user");
  if (user) {
    try {
      const parsed = JSON.parse(user);
      if (parsed && parsed.emailId) {
        config.headers["X-User-Email"] = parsed.emailId;
      }
    } catch (e) { /* ignore */ }
  }
  return config;
});

export default api;