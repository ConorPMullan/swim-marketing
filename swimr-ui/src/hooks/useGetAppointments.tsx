import { useQuery, UseQueryResult } from "react-query";
import { axiosInstance } from "../integration/Instance";
import { AxiosResponse } from "axios";
import { IAppointment } from "../interfaces/appointment";

const useGetAppointments = (): UseQueryResult<AxiosResponse<IAppointment[]>> =>
  useQuery("getAppointments", () => axiosInstance.get("/api/appointments"));

export default useGetAppointments;
