import { useMutation, UseMutationResult } from "react-query";
import { axiosInstance } from "../integration/Instance";
import { AxiosResponse } from "axios";

export interface IDeleteAppointment {
  appointmentId: number;
}

export const deleteAppointment = async (
  appointmentToDelete: IDeleteAppointment
) => {
  const response = await axiosInstance.delete("/api/appointments/", {
    data: appointmentToDelete,
  });
  return response;
};

const useDeleteAppointment = (): UseMutationResult<
  AxiosResponse<any, any>,
  unknown,
  IDeleteAppointment,
  unknown
> => {
  const mutationResult = useMutation(deleteAppointment);

  return mutationResult;
};

export default useDeleteAppointment;
