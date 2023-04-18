import { fireEvent, screen } from "@testing-library/react";
import AppointmentForm, { IAppointmentForm, IEvent } from ".";
import TestUtils from "../../../test-utils";
import useGetClients from "../../../hooks/useGetClients";
import useGetAllUsers from "../../../hooks/useGetAllUsers";

import userEvent from "@testing-library/user-event";
jest.mock("../../../hooks/useGetClients");
jest.mock("../../../hooks/useGetAllUsers");
describe("AppointmentForm component", () => {
  const handleSubmit = jest.fn();
  const handleClose = jest.fn();

  const mockAppointment: IEvent = {
    id: 1,
    appointment_id: 1,
    title: "Mock Appointment",
    start: new Date("2022-01-01T09:00:00.000Z"),
    end: new Date("2022-02-02T10:00:00.000Z"),
    resourceId: 1,
    location: "Mock Location",
    client: {
      id: 1,
      client_name: "Mock Client",
      company_name: "Mock Company",
      email: "mock@example.com",
    },
    users: {
      id: 1,
      user_name: "Mock User",
      email: "mock@example.com",
      user_level_id: 1,
    },
  };

  const defaultProps: IAppointmentForm = {
    selectedAppointment: mockAppointment,
    modalType: "edit",
    handleSubmit: handleSubmit,
    handleClose: handleClose,
  };

  beforeEach(() => {
    (useGetClients as jest.Mock).mockReturnValue({
      data: {
        data: [
          {
            clientId: 1,
            clientName: "Alice Smith",
            emailAddress: "alice.smith@example.com",
            companyName: "Novexa Corp",
          },
        ],
      },
    });
    (useGetAllUsers as jest.Mock).mockReturnValue({
      data: {
        data: [
          {
            userId: 1,
            userName: "Mock User",
            emailAddress: "mock@example.com",
            userLevelId: 1,
          },
        ],
      },
    });
  });

  it("should render the form fields", () => {
    TestUtils.render(<AppointmentForm {...defaultProps} />);
    const titleInput = screen.getByLabelText(/title/i);
    const locationInput = screen.getByLabelText(/location/i);
    const startInput = screen.getByLabelText(/start date\/time/i);
    const endInput = screen.getByLabelText(/end date\/time/i);
    const saveButton = screen.getByRole("button", { name: /save/i });
    const cancelButton = screen.getByRole("button", { name: /cancel/i });

    expect(titleInput).toBeInTheDocument();
    expect(locationInput).toBeInTheDocument();
    expect(startInput).toBeInTheDocument();
    expect(endInput).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();

    const appointmentTitle = screen.getByTestId("title-input-field");
    fireEvent.change(appointmentTitle, {
      target: { value: "Appointment Title" },
    });
    expect(appointmentTitle).toHaveValue("Appointment Title");

    const startDatePicker = screen.getByLabelText(
      "Start Date/Time"
    ) as HTMLInputElement;
    userEvent.type(startDatePicker, "01/01/2021 01:00 AM");
    expect(startDatePicker).toHaveValue("01/01/2022⁩ ⁦09:00⁩ ⁦AM");

    const endDatePicker = screen.getByLabelText(
      "End Date/Time"
    ) as HTMLInputElement;
    userEvent.type(endDatePicker, "02/02/2021 10:00 AM");
    expect(endDatePicker).toHaveValue("02/02/2022⁩ ⁦10:00⁩ ⁦AM");

    const submitButton = screen.getByTestId("appointment-form-submit-btn");
    userEvent.click(submitButton);
  });
});
