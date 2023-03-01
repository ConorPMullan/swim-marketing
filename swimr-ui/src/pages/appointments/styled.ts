import { Divider, Grid } from "@mui/material";
import styled from "styled-components";

export const AppointmentDetails = styled.div`
  width: 70%;
  height: 70vh;
  background-color: rgba(255, 255, 255, 0.52);
  border-radius: 10px;
  overflow: hidden;
  margin: 15px;
  overflow-y: scroll;
`;

export const AppointmentWrapper = styled.div`
  width: 100%;
  height: 85vh;
  background-color: #2021247d;
  border-radius: 10px;
  overflow: hidden;
  overflow-y: scroll;
`;

export const AppointmentCalendar = styled(Grid)`
  .rbc-btn-group button {
    background-color: #c7621e;
    color: white;
  }
  .rbc-today {
    background-color: #c7621e;
    color: white;
  }
  .rbc-off-range-bg {
    background-color: #0c5163;
  }
  .rbc-timeslot-group > div:last-child {
    border-top: 0;
  }
  .rbc-timeslot-group {
    border-top: 0;
  }
  .rbc-toolbar-label {
    font-size: 28px;
    font-weight: bold;
  }
  * {
    font-family: "Poppins", sans-serif;
  }
`;

export const DetailsLabel = styled.b`
  color: #0c5163;
`;

export const AppointmentPanel = styled.div`
  height: 70vh;
  margin: 0 10px;
  background-color: rgba(255, 255, 255, 0.52);
  border-radius: 10px;
  overflow: hidden;
  overflow-y: scroll;
`;

export const AppointmentDivider = styled(Divider)`
  width: 100%;
  && {
    background-color: #0c5163;
  }
`;
