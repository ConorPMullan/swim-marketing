import axios, { InternalAxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
});

export const setBearerToken = (bearer: string) => {
  axiosInstance.interceptors.request.use(
    (config): InternalAxiosRequestConfig => {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${bearer}`;
      }
      return config;
    }
  );
};
