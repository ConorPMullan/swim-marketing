import { renderHook } from "@testing-library/react-hooks";
import {
  QueryClient,
  QueryClientProvider,
  UseMutationResult,
} from "react-query";
import useDeleteAppointment, {
  IDeleteAppointment,
  deleteAppointment,
} from "./useDeleteAppointment";
import { axiosInstance } from "../integration/Instance";
import { AxiosResponse } from "axios";
import { waitFor } from "@testing-library/react";

jest.mock("../integration/Instance");

describe("useDeleteAppointment", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const appointmentToDelete = {
    appointmentId: 1,
  };

  beforeEach(() => {
    (axiosInstance.delete as jest.Mock).mockResolvedValue({ status: 200 });
  });

  it("should call the deleteAppointment function with the correct arguments", async () => {
    await deleteAppointment(appointmentToDelete);
    expect(axiosInstance.delete).toHaveBeenCalledTimes(1);
    expect(axiosInstance.delete).toHaveBeenCalledWith("/api/appointments/", {
      data: appointmentToDelete,
    });
  });

  it("should return a mutation result object with the correct types", () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: any }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useDeleteAppointment(), { wrapper });

    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.isIdle).toBeTruthy();
    expect(result.current.isSuccess).toBeFalsy();
    expect(result.current.isError).toBeFalsy();
    expect(result.current.mutate).toBeDefined();
  });

  it("should call the deleteAppointment function when the mutate function is called", async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }: { children: any }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useDeleteAppointment(), { wrapper });

    await result.current.mutate(appointmentToDelete);
    await waitFor(() => {
      expect(axiosInstance.delete).toHaveBeenCalledTimes(1);
      expect(axiosInstance.delete).toHaveBeenCalledWith("/api/appointments/", {
        data: appointmentToDelete,
      });
    });
  });
});
