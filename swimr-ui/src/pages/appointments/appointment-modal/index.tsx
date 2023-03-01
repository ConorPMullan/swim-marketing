import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AppointmentForm from "../appointment-form";
import { IAppointment } from "../../../interfaces/appointment";

interface IAppointmentModalProps {
  handleClose: () => void;
  selectedAppointment: IAppointment | undefined;
  modalType: string;
}

export default function EditAppointmentModal(props: IAppointmentModalProps) {
  const { handleClose, selectedAppointment, modalType } = props;

  const handleNext = () => {
    if (modalType === "edit") {
      console.log("edit");
    } else {
      console.log("else");
    }
  };

  return (
    <Container component="div" sx={{ mb: 4 }}>
      <Paper elevation={0} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center" marginBottom={3}>
          Appointment Details
        </Typography>
        <React.Fragment>
          <AppointmentForm selectedAppointment={selectedAppointment} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Button onClick={handleClose}>CANCEL</Button>
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ mt: 3, ml: 1 }}
            >
              {"Save"}
            </Button>
          </Box>
        </React.Fragment>
      </Paper>
    </Container>
  );
}
