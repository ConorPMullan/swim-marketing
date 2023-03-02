import { useMutation, UseMutationResult } from "react-query";
import { axiosInstance } from "../integration/Instance";
import { AxiosResponse } from "axios";

interface IDeleteClient {
  clientId: number;
}

export const deleteClient = async (clientToDelete: IDeleteClient) => {
  const response = await axiosInstance.delete("/api/clients/", {
    data: clientToDelete,
  });
  return response;
};

const useDeleteClient = (): UseMutationResult<
  AxiosResponse<any, any>,
  unknown,
  IDeleteClient,
  unknown
> => {
  const mutationResult = useMutation(deleteClient);

  return mutationResult;
};

export default useDeleteClient;
