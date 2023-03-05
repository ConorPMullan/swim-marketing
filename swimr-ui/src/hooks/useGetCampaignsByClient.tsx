// import { useQuery, UseQueryResult } from "react-query";
// import { axiosInstance } from "../integration/Instance";
// import axios, { AxiosResponse } from "axios";

// interface ICampaign {
//   campaignId: number;
//   campaignName: string;
//   endDate: string;
//   startDate: string;
//   companyName?: string;
// }

// const useGetCampaignsByClient = (
//   param: string
// ): UseQueryResult<AxiosResponse<ICampaign[]>> => {
//   return useQuery(
//     ["data", param],
//     () => axiosInstance.get(`api/campaigns/client/${param}`),
//     { enabled: !!param }
//   );
// };
// export default useGetCampaignsByClient;

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
