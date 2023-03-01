import { useQuery, UseQueryResult } from "react-query";
import { axiosInstance } from "../integration/Instance";
import { AxiosResponse } from "axios";

interface IAppointments {
  id: number;
  appointment: {
    id: number;
    scheduledDateTime: string;
    duration: number;
    description: string;
    location: string;
  };
  client: {
    id: number;
    client_name: string;
    email: string;
    company_name: string;
  };
  users: {
    id: number;
    user_name: string;
    email: string;
    user_password: string;
    user_level_id: number;
  };
}

const useGetAppointments = (): UseQueryResult<AxiosResponse<IAppointments[]>> =>
  useQuery("getAppointments", () => axiosInstance.get("/api/appointments"));

export default useGetAppointments;
