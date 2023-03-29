import { renderHook, act } from "@testing-library/react-hooks";
import useCreateUser from "./useCreateUser";
import { axiosInstance } from "../integration/Instance";
import { QueryClient, QueryClientProvider } from "react-query";
import { waitFor } from "@testing-library/react";

jest.mock("../integration/Instance", () => ({
  axiosInstance: {
    post: jest.fn(),
  },
}));

const mockAxiosInstance = axiosInstance as jest.Mocked<typeof axiosInstance>;

describe("useCreateUser", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should call createUser and return data when useCreateUser is called", async () => {
    const userDetails = {
      email: "test@example.com",
      user_name: "Test Username",
      user_password: "password123!",
    };

    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: any }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useCreateUser(), {
      wrapper,
    });
    await act(() => result.current.mutate(userDetails));
    await waitFor(() => {
      expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        "/api/signup/",
        userDetails
      );
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.variables).toEqual(userDetails);
    });
  });
});
