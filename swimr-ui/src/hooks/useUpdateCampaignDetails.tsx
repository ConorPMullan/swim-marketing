import { useMutation, UseMutationResult } from "react-query";
import { axiosInstance } from "../integration/Instance";
import { AxiosResponse } from "axios";
import { IUpdateCampaign } from "../interfaces/campaign";

export const updateCampaignDetails = async (
  campaignDetails: IUpdateCampaign
) => {
  const response = await axiosInstance.put("/api/campaigns/", campaignDetails);
  return response;
};

const useUpdateCampaignDetails = (): UseMutationResult<
  AxiosResponse<any, any>,
  unknown,
  IUpdateCampaign,
  unknown
> => {
  const mutationResult = useMutation(updateCampaignDetails);

  return mutationResult;
};

export default useUpdateCampaignDetails;
