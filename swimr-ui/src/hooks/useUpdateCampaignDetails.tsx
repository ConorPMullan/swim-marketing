import { useMutation, UseMutationResult } from "react-query";
import { axiosInstance } from "../integration/Instance";
import { AxiosResponse } from "axios";

export interface IUpdateCampaign {
  campaignId: number;
  campaignName: string;
  startDate: Date | null;
  endDate: Date | null;
  companyName?: string;
  influencers?: any[];
  clientId: number;
}
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
