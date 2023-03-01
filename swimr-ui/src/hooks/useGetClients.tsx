import { useQuery, UseQueryResult } from "react-query";
import { axiosInstance } from "../integration/Instance";
import { AxiosResponse } from "axios";

interface IClient {
  clientId: number;
  clientName: string;
  companyName: string;
  emailAddress: string;
}

const useGetClients = (): UseQueryResult<AxiosResponse<IClient[]>> =>
  useQuery("getClients", () => axiosInstance.get("/api/clients"));

export default useGetClients;
