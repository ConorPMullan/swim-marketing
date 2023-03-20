import { renderHook, act } from "@testing-library/react-hooks";
import useCreateAppointment from "./useCreateAppointment";
import { axiosInstance } from "../integration/Instance";
import { QueryClient, QueryClientProvider } from "react-query";
import { waitFor } from "@testing-library/react";

jest.mock("../integration/Instance", () => ({
  axiosInstance: {
    post: jest.fn(),
  },
}));

const mockAxiosInstance = axiosInstance as jest.Mocked<typeof axiosInstance>;

describe("useCreateAppointment", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should call createAppointment and return data when useCreateAppointment is called", async () => {
    const appointmentDetails = {
      description: "Test appointment",
      scheduled_date_time: new Date(),
      end_date_time: new Date(),
      location: "Test location",
      user_id: 1,
      client_id: 2,
    };

    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: any }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useCreateAppointment(), {
      wrapper,
    });
    await act(() => result.current.mutate(appointmentDetails));
    await waitFor(() => {
      expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        "/api/appointments/",
        appointmentDetails
      );
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.variables).toEqual(appointmentDetails);
    });
  });

  //     const appointmentDetails = {
  //       description: "Test appointment",
  //       scheduled_date_time: new Date(),
  //       end_date_time: new Date(),
  //       location: "Test location",
  //       user_id: 1,
  //       client_id: 2,
  //     };
  //     const mockError = { message: "Failed to create appointment" };
  //     mockAxiosInstance.post.mockRejectedValueOnce(mockError);

  //     const { result, waitForNextUpdate } = renderHook(() =>
  //       useCreateAppointment()
  //     );
  //     await act(() => result.current.mutate(appointmentDetails));
  //     await waitForNextUpdate();

  //     expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
  //     expect(mockAxiosInstance.post).toHaveBeenCalledWith(
  //       "/api/appointments/",
  //       appointmentDetails
  //     );
  //     expect(result.current.isError).toBe(true);
  //     expect(result.current.error).toEqual(mockError);
  //   });
});
