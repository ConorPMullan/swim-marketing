import { renderHook, act } from "@testing-library/react-hooks";
import useAuth, { fetchAccessCodes } from "./useAuth";
import { QueryClient, QueryClientProvider } from "react-query";
import { waitFor } from "@testing-library/react";

jest.mock("../integration/Instance", () => ({
  axiosInstance: {
    post: jest.fn(),
  },
}));
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mockAxiosInstance = require("../integration/Instance").axiosInstance;

describe("useAuth", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should call fetchAccessCodes and return data when useAuth is called", async () => {
    const userDetails = { email: "test@example.com", password: "password" };
    const mockResponse = { data: { accessCode: "12345" } };
    mockAxiosInstance.post.mockResolvedValueOnce(mockResponse);
    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: any }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useAuth(), {
      wrapper,
    });
    await act(() => result.current.mutate(userDetails));

    await waitFor(() => {
      expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        "/api/authenticate",
        userDetails
      );
      expect(result.current.isSuccess).toBe(true);
    });
  });

  it("should handle error when fetchAccessCodes fails", async () => {
    const userDetails = { email: "test@example.com", password: "password" };
    const mockError = { message: "Invalid credentials" };
    mockAxiosInstance.post.mockRejectedValueOnce(mockError);
    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: any }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useAuth(), {
      wrapper,
    });
    await act(() => result.current.mutate(userDetails));

    await waitFor(() => {
      expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        "/api/authenticate",
        userDetails
      );
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toEqual(mockError);
    });
  });
});

describe("fetchAccessCodes", () => {
  it("should call axiosInstance.post with userDetails and return data", async () => {
    const userDetails = { email: "test@example.com", password: "password" };
    const mockResponse = { data: { accessCode: "12345" } };
    mockAxiosInstance.post.mockResolvedValueOnce(mockResponse);

    const response = await fetchAccessCodes(userDetails);

    await waitFor(() => {
      expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        "/api/authenticate",
        userDetails
      );
      expect(response).toEqual(mockResponse);
    });
  });
});
