import { renderHook, act } from "@testing-library/react-hooks";
import useCreateCampaign from "./useCreateCampaign";
import { axiosInstance } from "../integration/Instance";
import { QueryClient, QueryClientProvider } from "react-query";
import { waitFor } from "@testing-library/react";

jest.mock("../integration/Instance", () => ({
  axiosInstance: {
    post: jest.fn(),
  },
}));

const mockAxiosInstance = axiosInstance as jest.Mocked<typeof axiosInstance>;

describe("useCreateCampaign", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should call createCampaign and return data when useCreateCampaign is called", async () => {
    const campaignDetails = {
      campaignId: 1,
      campaignName: "Test Campaign",
      startDate: new Date("2021-01-01"),
      endDate: new Date("2021-02-02"),
      influencers: [],
      clientId: 1,
    };

    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: any }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useCreateCampaign(), {
      wrapper,
    });
    await act(() => result.current.mutate(campaignDetails));
    await waitFor(() => {
      expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        "/api/campaigns/",
        campaignDetails
      );
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.variables).toEqual(campaignDetails);
    });
  });
});
