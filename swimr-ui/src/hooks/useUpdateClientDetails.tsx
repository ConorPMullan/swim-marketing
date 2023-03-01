import { useMutation, UseMutationResult } from "react-query";
import { axiosInstance } from "../integration/Instance";
import { AxiosResponse } from "axios";
import { IClientDetails } from "../interfaces/client";

export const updateClientDetails = async (clientDetails: IClientDetails) => {
  const response = await axiosInstance.put("/api/clients/", clientDetails);
  return response;
};

const useUpdateClientDetails = (): UseMutationResult<
  AxiosResponse<any, any>,
  unknown,
  IClientDetails,
  unknown
> => {
  const mutationResult = useMutation(updateClientDetails);

  return mutationResult;
};

export default useUpdateClientDetails;
