import { useMutation, UseMutationResult } from "react-query";
import { axiosInstance } from "../integration/Instance";
import { AxiosResponse } from "axios";
import { ICreateClient } from "../interfaces/client";

export const createClient = async (clientObject: ICreateClient) => {
  const response = await axiosInstance.post("/api/clients/", clientObject);
  return response;
};

const useCreateClient = (): UseMutationResult<
  AxiosResponse<any, any>,
  unknown,
  ICreateClient,
  unknown
> => {
  const mutationResult = useMutation(createClient);

  return mutationResult;
};

export default useCreateClient;
