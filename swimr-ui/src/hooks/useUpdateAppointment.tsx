import { useMutation, UseMutationResult } from "react-query";
import { axiosInstance } from "../integration/Instance";
import { AxiosResponse } from "axios";
import { IUpdateAppointment } from "../interfaces/appointment";

export const updateAppointment = async (
  appointmentDetails: IUpdateAppointment
) => {
  const response = await axiosInstance.put(
    "/api/appointments/",
    appointmentDetails
  );
  return response;
};

const useUpdateAppointment = (): UseMutationResult<
  AxiosResponse<any, any>,
  unknown,
  IUpdateAppointment,
  unknown
> => {
  const mutationResult = useMutation(updateAppointment);

  return mutationResult;
};

export default useUpdateAppointment;
