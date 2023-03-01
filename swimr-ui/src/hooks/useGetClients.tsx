import { useQuery, UseQueryResult } from "react-query";
import { axiosInstance } from "../integration/Instance";
import { AxiosResponse } from "axios";
import { useEffect } from "react";

interface IClient {
  clientId: number;
  clientName: string;
  companyName: string;
  emailAddress: string;
}

const useGetClients = (): UseQueryResult<AxiosResponse<IClient[]>> => {
  const queryResult = useQuery("getClients", () =>
    axiosInstance.get("/api/clients")
  );

  useEffect(() => {
    queryResult.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refetchClients = () => {
    queryResult.refetch();
  };

  //@ts-ignore
  return { ...queryResult, refetchClients };
};

export default useGetClients;
