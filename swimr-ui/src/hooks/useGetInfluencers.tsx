import { useQuery, UseQueryResult } from "react-query";
import { axiosInstance } from "../integration/Instance";
import { AxiosResponse } from "axios";
import { IInfluencers } from "../interfaces/influencer";

const useGetInfluencers = (): UseQueryResult<AxiosResponse<IInfluencers[]>> =>
  useQuery("getInfluencers", () => axiosInstance.get("/api/influencers"), {
    refetchOnWindowFocus: false,
  });

export default useGetInfluencers;
