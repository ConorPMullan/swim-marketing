import { renderHook } from "@testing-library/react-hooks";
import useGetInfluencers from "./useGetInfluencers";
import { QueryClient, QueryClientProvider } from "react-query";
import useGetClients from "./useGetClients";

describe("useGetClients", () => {
  it("should fetch client data", async () => {
    const queryClient = new QueryClient();

    const wrapper = ({ children }: { children: any }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result, waitFor } = renderHook(() => useGetClients(), {
      wrapper,
    });

    expect(result.current.isLoading).toBe(true);
    //@ts-ignore
    result.current.refetchClients();
    await waitFor(() => result.current.isSuccess);

    expect(result.current.isLoading).toBe(false);

    expect(result.current.data).toBeDefined();
  });
});
