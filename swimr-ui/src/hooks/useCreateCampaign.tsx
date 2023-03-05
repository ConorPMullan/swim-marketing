import { useMutation, UseMutationResult } from "react-query";
import { axiosInstance } from "../integration/Instance";
import { AxiosResponse } from "axios";

interface ICreateCampaign {
  campaignId: number;
  campaignName: string;
  startDate: Date | null;
  endDate: Date | null;
  influencers?: any[];
  clientId: number;
}

export const createCampaign = async (campaignDetails: ICreateCampaign) => {
  const response = await axiosInstance.post("/api/campaigns/", campaignDetails);
  return response;
};

const useCreateCampaign = (): UseMutationResult<
  AxiosResponse<any, any>,
  unknown,
  ICreateCampaign,
  unknown
> => {
  const mutationResult = useMutation(createCampaign);

  return mutationResult;
};

export default useCreateCampaign;
