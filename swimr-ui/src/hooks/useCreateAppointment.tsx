import { useMutation, UseMutationResult } from "react-query";
import { axiosInstance } from "../integration/Instance";
import { AxiosResponse } from "axios";
import { ICreateAppointment } from "../interfaces/appointment";

export const createAppointment = async (
  appointmentDetails: ICreateAppointment
) => {
  const response = await axiosInstance.post(
    "/api/appointments/",
    appointmentDetails
  );
  return response;
};

const useCreateAppointment = (): UseMutationResult<
  AxiosResponse<any, any>,
  unknown,
  ICreateAppointment,
  unknown
> => {
  const mutationResult = useMutation(createAppointment);

  return mutationResult;
};

export default useCreateAppointment;
