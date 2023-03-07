import React from "react";
import { render } from "@testing-library/react";
import TestUtils from "../../../../test-utils";
import { IAppointment } from "../../../../interfaces/appointment";
import AppointmentsList from ".";

const mockAppointments: IAppointment[] = [
  {
    id: 1,
    appointment: {
      id: 1,
      scheduled_date_time: new Date("2023-03-06T08:00:00.000Z"),
      end_date_time: new Date("2023-03-06T09:00:00.000Z"),
      description: "Meeting",
      location: "Conference Room",
    },
    client: {
      id: 1,
      client_name: "John Doe",
      email: "johndoe@example.com",
      company_name: "Acme Inc",
    },
    users: {
      id: 1,
      user_name: "Jane Doe",
      email: "janedoe@example.com",
      user_level_id: 1,
    },
  },
];

describe("AppointmentsList", () => {
  it("renders appointments list correctly", () => {
    const { getByText } = TestUtils.render(
      <AppointmentsList sortedAppointments={mockAppointments} />
    );

    expect(getByText(/Meeting/)).toBeInTheDocument();
    expect(getByText(/60 minutes/)).toBeInTheDocument();
    expect(getByText(/Conference Room/)).toBeInTheDocument();
    expect(getByText(/johndoe@example.com/)).toBeInTheDocument();
    expect(getByText(/janedoe@example.com/)).toBeInTheDocument();
    expect(getByText(/Mon/)).toBeInTheDocument();
    expect(getByText(/Mar/)).toBeInTheDocument();
  });

  it("calculates appointment duration correctly", () => {
    const { getByText } = TestUtils.render(
      <AppointmentsList sortedAppointments={mockAppointments} />
    );

    expect(getByText(/60 minutes/)).toBeInTheDocument();
  });
});
