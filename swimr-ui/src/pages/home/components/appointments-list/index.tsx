import React from "react";
import { CardContent, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TimerIcon from "@mui/icons-material/Timer";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { AppointmentDetails, AppointmentTile, TileWrapper } from "./styled";
import { IAppointment } from "../../../../interfaces/appointment";

interface IAppointmentList {
  sortedAppointments: IAppointment[];
}
const AppointmentsList = (props: IAppointmentList) => {
  const { sortedAppointments } = props;
  return (
    <React.Fragment>
      {sortedAppointments.map((appointment, index) => {
        const sd = new Date(appointment.appointment.scheduled_date_time);
        const ed = new Date(appointment.appointment.end_date_time);
        const difference = ed.getTime() - sd.getTime();
        const resultInMinutes = Math.round(difference / 60000);
        return (
          <AppointmentTile key={`appointment-key-${index}`}>
            <TileWrapper>
              <CardContent
                sx={{
                  width: "40%",
                  backgroundColor: "#1c5dbc",
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                }}
              >
                <Typography variant="h5" component="div" color="white">
                  {appointment.appointment.description}
                </Typography>
                <Typography
                  sx={{ mt: 1, mb: 1.5, display: "flex" }}
                  color="text.secondary"
                >
                  <TimerIcon sx={{ mr: 1.5 }} width="10px" />
                  {`${resultInMinutes} minutes`}
                </Typography>
                <Typography
                  sx={{ mt: 1, mb: 1.5, display: "flex" }}
                  color="text.secondary"
                >
                  <LocationOnIcon sx={{ mr: 1.5 }} width="10px" />
                  {appointment.appointment.location}
                </Typography>
              </CardContent>
              <CardContent
                style={{
                  textAlign: "center",
                  width: "40%",
                }}
              >
                <AppointmentDetails>
                  <Typography variant="body1">
                    {appointment.client.email}
                  </Typography>
                  <Typography variant="body1">
                    {appointment.users.email}
                  </Typography>
                </AppointmentDetails>
                <PeopleAltIcon />
              </CardContent>
              <CardContent
                style={{
                  textAlign: "center",
                  width: "20%",
                  padding: 0,
                }}
              >
                <AppointmentDetails>
                  <Typography variant="body1">
                    {sd.toLocaleString("en-us", { weekday: "short" })}
                  </Typography>
                  <Typography variant="h4" color="#1c5dbc">
                    {sd.getDate()}
                  </Typography>
                  <Typography variant="h6">
                    {sd.toLocaleString("en-us", { month: "short" })}
                  </Typography>
                </AppointmentDetails>
                <CalendarTodayIcon />
              </CardContent>
            </TileWrapper>
          </AppointmentTile>
        );
      })}
    </React.Fragment>
  );
};

export default AppointmentsList;
