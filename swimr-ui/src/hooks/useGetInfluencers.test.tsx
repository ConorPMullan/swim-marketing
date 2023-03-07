import { renderHook } from "@testing-library/react-hooks";
import useGetInfluencers from "./useGetInfluencers";
import { QueryClient, QueryClientProvider } from "react-query";

describe("useGetInfluencers", () => {
  it("should fetch influencers data", async () => {
    const queryClient = new QueryClient();

    const wrapper = ({ children }: { children: any }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result, waitFor } = renderHook(() => useGetInfluencers(), {
      wrapper,
    });
    // const { result, waitForNextUpdate } = renderHook(() => useGetInfluencers());

    // assert that the hook is initially in a loading state
    expect(result.current.isLoading).toBe(true);

    // wait for the hook to finish fetching data
    await waitFor(() => result.current.isSuccess);

    // assert that the hook is no longer in a loading state
    expect(result.current.isLoading).toBe(false);

    // assert that the hook has fetched data successfully
    expect(result.current.data).toBeDefined();
  });
});
