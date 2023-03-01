import { useQuery, UseQueryResult } from "react-query";
import { axiosInstance } from "../integration/Instance";
import { AxiosResponse } from "axios";

interface IUser {
  userId: number;
  userName: string;
  emailAddress: string;
  userLevelId: number;
}

const useGetAllUsers = (): UseQueryResult<AxiosResponse<IUser[]>> =>
  useQuery("getUsers", () => axiosInstance.get("/api/users"));

export default useGetAllUsers;
