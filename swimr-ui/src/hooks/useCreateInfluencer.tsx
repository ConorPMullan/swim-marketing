import { useMutation, UseMutationResult } from "react-query";
import { axiosInstance } from "../integration/Instance";
import { AxiosResponse } from "axios";

interface ICreateInfluencer {
  influencer_name: string;
  email: string;
  platform_id: number;
  price_per_post: string;
  is_active: boolean;
}

export const createInfluencer = async (
  influencerDetails: ICreateInfluencer
) => {
  const response = await axiosInstance.post(
    "/api/influencers/",
    influencerDetails
  );
  return response;
};

const useCreateInfluencer = (): UseMutationResult<
  AxiosResponse<any, any>,
  unknown,
  ICreateInfluencer,
  unknown
> => {
  const mutationResult = useMutation(createInfluencer);

  return mutationResult;
};

export default useCreateInfluencer;
