import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api-acai.onrender.com",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const success = (response) => response;
const error = (error) => {
  const status = error.response?.status;
  const message = error.response?.data?.message;
  console.log("Axios error:", message);
  if (status === 401 && message !== "Credenciales inválidas") {
    window.location.href = "/login";
  }
  if (status === 403) {
    window.location.href = "/forbidden";
  }

  return Promise.reject(error);
};

instance.interceptors.response.use(success, error);
