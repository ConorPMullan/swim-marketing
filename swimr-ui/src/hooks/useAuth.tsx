import axios from "axios";
import { useMutation } from "react-query";
import { axiosInstance } from "../integration/Instance";

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
