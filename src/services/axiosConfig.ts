import axios from "axios";
import { useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const useAxiosAuth = () => {
  useEffect(() => {
    const token = localStorage.getItem("refine-auth");

    axiosInstance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, []);
};
const axiosInstance = axios.create({
  baseURL: API_URL,
});

export { axiosInstance, useAxiosAuth };
