import { useQuery, UseQueryResult } from "react-query";
import { axiosInstance } from "../integration/Instance";
import axios, { AxiosResponse } from "axios";

interface ICampaign {
  campaignId: number;
  campaignName: string;
  endDate: string;
  startDate: string;
  companyName?: string;
}

const useGetCampaignsByClient = (
  param: string
): UseQueryResult<AxiosResponse<ICampaign[]>> => {
  return useQuery(
    ["data", param],
    () => axiosInstance.get(`api/campaigns/client/${param}`),
    { enabled: !!param }
  );
};
export default useGetCampaignsByClient;
