import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Autocomplete } from "@mui/material";
import { useState } from "react";
import { IAppointment } from "../../../interfaces/appointment";
import useGetClients from "../../../hooks/useGetClients";
import useGetAllUsers from "../../../hooks/useGetAllUsers";

interface IAppointmentForm {
  selectedAppointment: IAppointment | undefined;
}

export default function AppointmentForm(props: IAppointmentForm) {
  const { selectedAppointment } = props;
  const { data } = useGetAllUsers();
  const { data: clientData } = useGetClients();
  const [appointmentName, setAppointmentName] = useState(
    selectedAppointment?.appointment.description || ""
  );
  const [appointmentLocation, setAppointmentLocation] = useState(
    selectedAppointment?.appointment.location || ""
  );

  const clientOptions = clientData?.data.map(
    (client: { clientName: any; clientId: any }) => {
      return { label: client.clientName, value: client.clientId };
    }
  );

  const userOptions = data?.data.map((user: { userName: any; userId: any }) => {
    return { label: user.userName, value: user.userId };
  });

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="appointmentName"
            name="appointmentName"
            label="Title"
            fullWidth
            autoComplete="title"
            variant="outlined"
            value={appointmentName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setAppointmentName(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="company-name-txt-field"
            name="company-name-txt-field"
            label="Company Name"
            fullWidth
            autoComplete="company"
            variant="outlined"
            value={appointmentLocation}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setAppointmentLocation(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            disablePortal
            id="combo-box-client"
            options={clientOptions || []}
            renderInput={(params) => (
              <TextField {...params} label="Client Attendee" />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            disablePortal
            id="combo-box-user"
            options={userOptions || []}
            renderInput={(params) => (
              <TextField {...params} label="User Attendee" />
            )}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
