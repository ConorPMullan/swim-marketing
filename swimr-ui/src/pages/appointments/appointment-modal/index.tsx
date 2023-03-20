import * as React from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import AppointmentForm from "../appointment-form";
import {
  IAppointmentModalProps,
  ICreateAppointment,
  IEvent,
  IUpdateAppointment,
} from "../../../interfaces/appointment";
import useUpdateAppointment from "../../../hooks/useUpdateAppointment";
import toast from "react-hot-toast";
import { StatusCodes } from "http-status-codes";
import useCreateAppointment from "../../../hooks/useCreateAppointment";

export default function EditAppointmentModal(props: IAppointmentModalProps) {
  const { handleClose, selectedAppointment, modalType } = props;
  const { mutate } = useUpdateAppointment();
  const { mutate: create } = useCreateAppointment();
  const handleSubmit = (values: IEvent) => {
    if (modalType === "edit") {
      const parsedAppointment: IUpdateAppointment = {
        id: values.id,
        appointment_id: values.appointment_id,
        description: values.title,
        location: values.location,
        scheduled_date_time: values.start,
        end_date_time: values.end,
        users: values.users,
        client: values.client,
      };
      mutate(parsedAppointment, {
        onSuccess: (response: any) => {
          if (response.status === StatusCodes.OK) {
            console.log("respi", response.status);
            toast.success("Appointment successfully updated");
            handleClose();
          }
        },
        onError: () => {
          toast.error("Appointment could not be updated");
          throw new Error();
        },
      });
    } else if (modalType === "create") {
      const parsedAppointment: ICreateAppointment = {
        description: values.title,
        location: values.location,
        scheduled_date_time: values.start,
        end_date_time: values.end,
        user_id: values.users.id,
        client_id: values.client.id,
      };
      create(parsedAppointment, {
        onSuccess: (response) => {
          if (response.status === StatusCodes.OK) {
            toast.success("Appointment successfully created");
            handleClose();
          }
        },
        onError: () => {
          toast.error("Appointment could not be created");
          throw new Error();
        },
      });
    }
  };

  return (
    <Container component="div" sx={{ mb: 4 }}>
      <Paper
        data-testid="appointment-modal"
        elevation={0}
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography
          data-testid={`appointment-modal-title-${selectedAppointment?.appointment_id}`}
          component="h1"
          variant="h4"
          align="center"
          marginBottom={3}
        >
          Appointment Details
        </Typography>
        <React.Fragment>
          <AppointmentForm
            selectedAppointment={selectedAppointment}
            modalType={modalType}
            handleSubmit={handleSubmit}
            handleClose={handleClose}
          />
        </React.Fragment>
      </Paper>
    </Container>
  );
}
