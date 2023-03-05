import { useState } from "react";
import {
  AppointmentCalendar,
  AppointmentDetails,
  AppointmentDivider,
  AppointmentWrapper,
  DetailsLabel,
} from "./styled";
import { FlexDiv } from "../clients/styled";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import ModalComponent from "../../components/modal";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import useGetAppointments from "../../hooks/useGetAppointments";
import EditAppointmentModal from "./appointment-modal";
import { IEvent } from "../../interfaces/appointment";
import ConfirmationModal from "../../components/confirmation-modal";
import useDeleteAppointment from "../../hooks/useDeleteAppointment";
import { StatusCodes } from "http-status-codes";
import toast from "react-hot-toast";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);

const Appointments = () => {
  const { data: appointmentData, refetch } = useGetAppointments();
  const { mutate } = useDeleteAppointment();
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<IEvent>();
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const handleCreateModal = () => {
    setModalType("create");
    setOpen(true);
  };

  const handleEditModal = () => {
    setModalType("edit");
    setOpen(true);
  };

  const handleClose = () => {
    refetch();
    setOpen(false);
  };

  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "5px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  const appointmentEvents = appointmentData?.data.map((appointment, index) => {
    const { appointment: appointmentInfo } = appointment;
    return {
      id: appointment.id,
      title: appointmentInfo.description,
      start: appointmentInfo.scheduled_date_time,
      end: appointmentInfo.end_date_time,
      resourceId: index,
      location: appointmentInfo.location,
      appointment_id: appointmentInfo.id,
      client: appointment.client,
      users: appointment.users,
    };
  });

  const handleEventClick = (params: any) => {
    if (params.resourceId !== selectedEvent?.resourceId) {
      setSelectedEvent(params);
    } else if (params.resourceId === selectedEvent?.resourceId) {
      setSelectedEvent(undefined);
    }
  };

  const handleDeleteModal = () => {
    selectedEvent &&
      mutate(
        { appointmentId: selectedEvent.appointment_id },
        {
          onSuccess: (response) => {
            if (response.status === StatusCodes.OK) {
              toast.success("Appointment successfully deleted");
              refetch();
              handleClose();
            }
          },
          onError: () => {
            toast.error("Appointment could not be deleted");
            throw new Error();
          },
        }
      );
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  const handleConfirmation = () => {
    handleDeleteModal();
    handleCloseConfirmation();
  };

  const openConfirmationModal = () => {
    setOpenConfirmation(true);
  };

  return (
    <AppointmentWrapper>
      <FlexDiv
        style={{ justifyContent: "space-between", alignItems: "flex-end" }}
      >
        <Typography variant="h4" sx={{ m: 2, mb: 0 }}>
          Appointments
        </Typography>
        <Grid sx={{ mr: 3 }}>
          <IconButton
            sx={{ backgroundColor: "#c7621e" }}
            onClick={handleCreateModal}
          >
            <Add />
          </IconButton>
        </Grid>
      </FlexDiv>
      <FlexDiv>
        <AppointmentCalendar container sx={{ mb: 0 }}>
          <Calendar
            style={{
              height: "70vh",
              margin: "15px",
              width: selectedEvent ? "55vw" : "100%",
            }}
            localizer={localizer}
            events={appointmentEvents}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={handleEventClick}
          />
        </AppointmentCalendar>
        {selectedEvent && (
          <AppointmentDetails>
            <FlexDiv
              style={{
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" sx={{ m: 2 }}>
                {selectedEvent.title}
              </Typography>
              <Grid sx={{ mr: 3 }}>
                <IconButton onClick={openConfirmationModal}>
                  <Delete />
                </IconButton>
                <IconButton onClick={handleEditModal}>
                  <Edit />
                </IconButton>
              </Grid>
            </FlexDiv>
            <AppointmentDivider />
            <Grid container sx={{ m: 3, mb: 0 }}>
              <Grid item xs={4}>
                <DetailsLabel>Location:</DetailsLabel>
              </Grid>
              <Grid item xs={8}>
                {selectedEvent.location}
              </Grid>
            </Grid>
            <Grid container sx={{ m: 3, mb: 0 }}>
              <Grid item xs={4}>
                <DetailsLabel>Date:</DetailsLabel>
              </Grid>
              <Grid item xs={8}>
                {String(selectedEvent.start)}
              </Grid>
            </Grid>
            <Grid container sx={{ m: 3, mb: 0 }}>
              <Grid item xs={4}>
                <DetailsLabel>Start Time:</DetailsLabel>
              </Grid>
              <Grid item xs={8}>
                {String(selectedEvent.start)}
              </Grid>
            </Grid>
            <Grid container sx={{ m: 3, mb: 0 }}>
              <Grid item xs={4}>
                <DetailsLabel>End Time:</DetailsLabel>
              </Grid>
              <Grid item xs={8}>
                {String(selectedEvent.end)}
              </Grid>
            </Grid>
            <Grid container sx={{ m: 3, mb: 0 }}>
              <Grid item xs={4}>
                <DetailsLabel>Attendees:</DetailsLabel>
              </Grid>
              <Grid item xs={8}>
                <Grid>
                  {selectedEvent.client.client_name}
                  {bull}
                  <span style={{ color: "#c7621e" }}>
                    {selectedEvent.client.company_name}
                  </span>
                </Grid>
                <Grid>
                  {selectedEvent.users.user_name}
                  {bull}
                  <span style={{ color: "#c7621e" }}>Swimr</span>
                </Grid>
              </Grid>
            </Grid>
          </AppointmentDetails>
        )}
      </FlexDiv>
      <ModalComponent open={open} handleClose={handleClose}>
        <EditAppointmentModal
          handleClose={handleClose}
          selectedAppointment={selectedEvent}
          modalType={modalType}
        />
      </ModalComponent>
      <ConfirmationModal
        open={openConfirmation}
        handleClose={handleCloseConfirmation}
        handleConfirmation={handleConfirmation}
        textToDisplay="Are you sure you want to delete this appointment?"
      />
    </AppointmentWrapper>
  );
};

export default Appointments;
