import { renderHook, act } from "@testing-library/react-hooks";
import useUpdateCampaignDetails from "./useUpdateCampaignDetails";
import { axiosInstance } from "../integration/Instance";
import { QueryClient, QueryClientProvider } from "react-query";
import { waitFor } from "@testing-library/react";

jest.mock("../integration/Instance", () => ({
  axiosInstance: {
    put: jest.fn(),
  },
}));

const mockAxiosInstance = axiosInstance as jest.Mocked<typeof axiosInstance>;

describe("useUpdateCampaignDetails", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should call updateCampaign and return data when useUpdateCampaignDetails is called", async () => {
    const campaignDetails = {
      campaignId: 1,
      campaignName: "Test Campaign",
      startDate: new Date("2021-01-01"),
      endDate: new Date("2021-02-02"),
      companyName: "Test Company",
      influencers: [],
      clientId: 1,
    };

    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: any }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useUpdateCampaignDetails(), {
      wrapper,
    });
    await act(() => result.current.mutate(campaignDetails));
    await waitFor(() => {
      expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.put).toHaveBeenCalledWith(
        "/api/campaigns/",
        campaignDetails
      );
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.variables).toEqual(campaignDetails);
    });
  });
});
