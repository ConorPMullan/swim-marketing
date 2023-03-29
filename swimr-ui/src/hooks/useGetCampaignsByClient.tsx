import { useMutation, UseMutationResult } from "react-query";
import { axiosInstance } from "../integration/Instance";
import { AxiosResponse } from "axios";
import { ICampaign } from "../interfaces/campaign";

export const fetchClientCampaigns = async (clientId: number) => {
  const response = await axiosInstance.get(`/api/campaigns/client/${clientId}`);
  return response;
};

const useGetCampaignsByClient = (): UseMutationResult<
  AxiosResponse<ICampaign[], any>,
  unknown,
  number,
  unknown
> => {
  const mutationResult = useMutation(fetchClientCampaigns);

  return mutationResult;
};

export default useGetCampaignsByClient;
