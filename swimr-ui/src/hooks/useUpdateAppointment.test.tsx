import { renderHook, act } from "@testing-library/react-hooks";
import useUpdateAppointment from "./useUpdateAppointment";
import { axiosInstance } from "../integration/Instance";
import { QueryClient, QueryClientProvider } from "react-query";
import { waitFor } from "@testing-library/react";

jest.mock("../integration/Instance", () => ({
  axiosInstance: {
    put: jest.fn(),
  },
}));

const mockAxiosInstance = axiosInstance as jest.Mocked<typeof axiosInstance>;

describe("useUpdateAppointment", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should call createAppointment and return data when useUpdateAppointment is called", async () => {
    const appointmentDetails = {
      id: 1,
      description: "Test appointment",
      scheduled_date_time: new Date(),
      end_date_time: new Date(),
      location: "Test location",
      user_id: 1,
      client_id: 2,
      appointment_id: 1,
      client: {
        id: 2,
        client_name: "test client",
        email: "testemail@mail.com",
        company_name: "test company",
      },
      users: {
        id: 1,
        user_name: "test user",
        email: "testuser@mail.com",
        user_level_id: 1,
      },
    };

    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: any }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useUpdateAppointment(), {
      wrapper,
    });
    await act(() => result.current.mutate(appointmentDetails));
    await waitFor(() => {
      expect(mockAxiosInstance.put).toHaveBeenCalledTimes(1);
      expect(mockAxiosInstance.put).toHaveBeenCalledWith(
        "/api/appointments/",
        appointmentDetails
      );
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.variables).toEqual(appointmentDetails);
    });
  });
});
