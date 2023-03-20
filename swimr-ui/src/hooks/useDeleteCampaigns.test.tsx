import { renderHook } from "@testing-library/react-hooks";
import {
  QueryClient,
  QueryClientProvider,
  UseMutationResult,
} from "react-query";
import useDeleteCampaign, {
  IDeleteCampaign,
  deleteCampaign,
} from "./useDeleteCampaign";
import { axiosInstance } from "../integration/Instance";
import { AxiosResponse } from "axios";
import { waitFor } from "@testing-library/react";

jest.mock("../integration/Instance");

describe("useDeleteCampaign", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const campaignToDelete = {
    campaignId: 1,
  };

  beforeEach(() => {
    (axiosInstance.delete as jest.Mock).mockResolvedValue({ status: 200 });
  });

  it("should call the deleteCampaign function with the correct arguments", async () => {
    await deleteCampaign(campaignToDelete);
    expect(axiosInstance.delete).toHaveBeenCalledTimes(1);
    expect(axiosInstance.delete).toHaveBeenCalledWith("/api/campaigns/", {
      data: campaignToDelete,
    });
  });

  it("should return a mutation result object with the correct types", () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: any }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useDeleteCampaign(), { wrapper });

    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isIdle).toBeTruthy();
    expect(result.current.isSuccess).toBeFalsy();
    expect(result.current.isError).toBeFalsy();
    expect(result.current.mutate).toBeDefined();
  });

  it("should call the deleteCampaign function when the mutate function is called", async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: any }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useDeleteCampaign(), { wrapper });

    await result.current.mutate(campaignToDelete);
    await waitFor(() => {
      expect(axiosInstance.delete).toHaveBeenCalledTimes(1);
      expect(axiosInstance.delete).toHaveBeenCalledWith("/api/campaigns/", {
        data: campaignToDelete,
      });
    });
  });
});
