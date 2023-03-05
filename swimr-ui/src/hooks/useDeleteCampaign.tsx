import { useMutation, UseMutationResult } from "react-query";
import { axiosInstance } from "../integration/Instance";
import { AxiosResponse } from "axios";

interface IDeleteCampaign {
  campaignId: number;
}

export const deleteCampaign = async (campaignToDelete: IDeleteCampaign) => {
  const response = await axiosInstance.delete("/api/campaigns/", {
    data: campaignToDelete,
  });
  return response;
};

const useDeleteCampaign = (): UseMutationResult<
  AxiosResponse<any, any>,
  unknown,
  IDeleteCampaign,
  unknown
> => {
  const mutationResult = useMutation(deleteCampaign);

  return mutationResult;
};

export default useDeleteCampaign;
