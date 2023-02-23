import axios, { AxiosResponse } from "axios";
import { UseQueryResult, useMutation, useQuery } from "react-query";
import { IUserLogin } from "../interfaces/auth";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
});
interface IAuthBody {
  email: string;
  password: string;
}

export const fetchAccessCodes = async (userDetails: any) => {
  const response = await axiosInstance.post("/api/authenticate", userDetails);
  return response;
};

const useAuth = () =>
  useMutation((checkUserAuth: IAuthBody) => fetchAccessCodes(checkUserAuth));

export default useAuth;
