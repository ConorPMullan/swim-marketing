import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import EditAppointmentModal from ".";

import { StatusCodes } from "http-status-codes";
import { toast } from "react-hot-toast";
import { act } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";
import useUpdateAppointment from "../../../hooks/useUpdateAppointment";
import useCreateAppointment from "../../../hooks/useCreateAppointment";
import {
  IAppointmentModalProps,
  IEvent,
} from "../../../interfaces/appointment";
import TestUtils from "../../../test-utils";

jest.mock("../../../hooks/useUpdateAppointment");
jest.mock("../../../hooks/useCreateAppointment");
jest.mock("react-hot-toast");

describe("EditAppointmentModal", () => {
  const handleClose = jest.fn();
  const sd = new Date("2023-01-01");
  const ed = new Date("2023-02-02");
  const appointment: IEvent = {
    id: 1,
    appointment_id: 1,
    title: "Test Event",
    start: sd,
    end: ed,
    resourceId: 1,
    location: "meeting room",
    client: {
      id: 1,
      client_name: "test client",
      company_name: "test company",
      email: "testemail@mail.com",
    },
    users: {
      id: 1,
      user_name: "test user",
      email: "testemail@mail.com",
      user_level_id: 1,
    },
  };
  const props: IAppointmentModalProps = {
    handleClose,
    selectedAppointment: appointment,
    modalType: "edit",
  };
  beforeEach(() => {
    (useUpdateAppointment as jest.Mock).mockReturnValue({
      mutate: jest.fn().mockResolvedValue({ status: 200 }),
    });
    (useCreateAppointment as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render the component properly", () => {
    TestUtils.render(<EditAppointmentModal {...props} />);
    expect(screen.getByTestId("appointment-modal")).toBeInTheDocument();
    expect(
      screen.getByTestId(
        `appointment-modal-title-${appointment.appointment_id}`
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Appointment Details")).toBeInTheDocument();
  });

  it("should call useUpdateAppointmentDetails hook with correct params when modalType is edit", async () => {
    const newProps = { ...props, selectedAppointment: appointment };
    TestUtils.render(<EditAppointmentModal {...newProps} />);
    const submitButton = screen.getByRole("button", { name: "SAVE" });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(useUpdateAppointment).toHaveBeenCalledTimes(1);
    });
  });

  it("should call useCreateAppointment hook with correct params when modalType is create", async () => {
    const newProps = {
      ...props,
      modalType: "create",
      selectedAppointment: undefined,
    };
    TestUtils.render(<EditAppointmentModal {...newProps} />);
    const submitButton = screen.getByRole("button", { name: "SAVE" });
    userEvent.click(submitButton);
    await waitFor(() => {
      expect(useCreateAppointment).toHaveBeenCalledTimes(1);
    });
  });
});
