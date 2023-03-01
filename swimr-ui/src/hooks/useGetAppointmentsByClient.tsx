import { useQuery, UseQueryResult } from "react-query";
import { axiosInstance } from "../integration/Instance";
import axios, { AxiosResponse } from "axios";

interface IAppointment {
  id: number;
  scheduledDateTime: string;
  duration: number;
  description: string;
  location: string;
}

const useGetClientAppointments = (
  param: string
): UseQueryResult<AxiosResponse<IAppointment[]>> => {
  return useQuery(
    ["getClientAppointments", param],
    () => axiosInstance.get(`api/appointments/client/${param}`),
    { enabled: !!param }
  );
};
export default useGetClientAppointments;
