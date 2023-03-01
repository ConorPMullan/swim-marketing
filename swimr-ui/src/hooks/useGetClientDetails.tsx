import { useMutation, UseMutationResult } from "react-query";
import { axiosInstance } from "../integration/Instance";
import { AxiosResponse } from "axios";

export const fetchClientDetails = async (clientId: number) => {
  const response = await axiosInstance.get(`/api/clients/${clientId}`);
  return response;
};

const useGetClientDetails = (): UseMutationResult<
  AxiosResponse<any, any>,
  unknown,
  number,
  unknown
> => {
  const mutationResult = useMutation(fetchClientDetails);

  return mutationResult;
};

export default useGetClientDetails;
