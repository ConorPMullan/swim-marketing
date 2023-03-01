import { useQuery, UseQueryResult } from "react-query";
import { axiosInstance } from "../integration/Instance";
import { AxiosResponse } from "axios";
import { IInfluencers } from "../interfaces/influencers";

const useGetInfluencers = (): UseQueryResult<AxiosResponse<IInfluencers[]>> =>
  useQuery("getInfluencers", () => axiosInstance.get("/api/influencers"));

export default useGetInfluencers;
