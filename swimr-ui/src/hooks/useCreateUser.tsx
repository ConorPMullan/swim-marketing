import { useMutation, UseMutationResult } from "react-query";
import { axiosInstance } from "../integration/Instance";
import { AxiosResponse } from "axios";
import { ICreateClient } from "../interfaces/client";

interface ICreateUser {
  email: string;
  user_name: string;
  user_password: string;
}

export const createUser = async (userObject: ICreateUser) => {
  const response = await axiosInstance.post("/api/signup/", userObject);
  return response;
};

const useCreateUser = (): UseMutationResult<
  AxiosResponse<any, any>,
  unknown,
  ICreateUser,
  unknown
> => {
  const mutationResult = useMutation(createUser);

  return mutationResult;
};

export default useCreateUser;
