import axios, { AxiosResponse } from "axios";
import { UseQueryResult, useQuery } from "react-query";

interface Health {
  name: string;
  status: string;
  version: string;
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
});

export const fetchHealthStatus = async () => {
  const response = await axiosInstance.get(`/health`);
  return response.data;
};

export const useUser = (): UseQueryResult<Health, Error> => {
  return useQuery<Health, Error>("useUser", () => fetchHealthStatus());
};
