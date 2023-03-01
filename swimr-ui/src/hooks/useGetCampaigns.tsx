import { useQuery, UseQueryResult } from "react-query";
import { axiosInstance } from "../integration/Instance";
import { AxiosResponse } from "axios";
import { ICampaign } from "../interfaces/campaign";

const useGetCampaigns = (): UseQueryResult<AxiosResponse<ICampaign[]>> =>
  useQuery("getCampaigns", () => axiosInstance.get("/api/campaigns"));

export default useGetCampaigns;
