import { useMutation, UseMutationResult } from "react-query";
import { axiosInstance } from "../integration/Instance";
import { AxiosResponse } from "axios";

interface IDeleteInfluencer {
  influencerId: number;
}

export const deleteInfluencer = async (
  influencerToDelete: IDeleteInfluencer
) => {
  const response = await axiosInstance.delete("/api/influencers/", {
    data: influencerToDelete,
  });
  return response;
};

const useDeleteInfluencer = (): UseMutationResult<
  AxiosResponse<any, any>,
  unknown,
  IDeleteInfluencer,
  unknown
> => {
  const mutationResult = useMutation(deleteInfluencer);

  return mutationResult;
};

export default useDeleteInfluencer;
